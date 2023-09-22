import {defineStore} from 'pinia';
import {BASE_API_URL} from "@/config/config";
import rulesDefinitions from "@/lib/rulesDefinitions";

const API_CONFIG = {
    BASE_URL: BASE_API_URL,
    HEADERS: {
        'Content-Type': 'application/json',
    },
    TOAST_OPTIONS: {
        success: {
            title: 'Success!',
            text: 'Ihr Code wurde korrekt geparst.',
            icon: 'success',
            toast: true,
            position: 'top-right',
        },
        error: {
            title: 'Ein Fehler ist aufgetreten 🥲!',
            icon: 'error',
            toast: true,
            position: 'top-right',
        },
    },
};


const state = () => ({
    parsedCode: undefined,
    spinner: false,
    toastOptions: {},
    rules: []
})

const getters = {
    getParsedCode: (state) => {
        return state.parsedCode
    },
    isSpinning: (state) => state.spinner,
    getRules: (state) => state.rules
}

const actions = {
    reset(){
        this.code = ""
        this.parsedCode = undefined
        this.rules = []
    },
    deleteRule(rule) {
        this.rules = this.rules.filter(r => {
            return r !== rule
        })
    },
    generateRules(){
        let elements = this.parsedCode[0].elements
        elements.forEach( elem => {
            // Class or Interface
            if(elem.name && elem.title){
                let rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_class_rule))
                rule.rule_specific.class_name = elem.name

                if(elem.isAbstract)
                    rule.rule_specific.abstract = elem.isAbstract

                if(elem.stereotypes.includes("interface"))
                    rule.rule_specific.interface = true

                // Methods & Attributes
                elem.members.forEach(member => {
                    // Method
                    if(member.returnType){
                        let method = JSON.parse(JSON.stringify(rulesDefinitions.METHODS_TYPE))
                        method.name = member.name
                        method.return_type = member.returnType
                        method.arguments = member._arguments

                        if(member.accessor === '+')
                            method.visibility = "public"
                        else if (member.accessor === "-")
                            method.visibility = "private"
                        else if (member.accessor === "#")
                            method.visibility = "protected"

                        method.is_static = member.isStatic
                        rule.rule_specific.methods.push(method)
                    }
                    // Attribute
                    else if (member.type){
                        let attribute = JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE))
                        attribute.name = member.name
                        attribute.type = member.type

                        if(member.accessor === '+')
                            attribute.visibility = "public"
                        else if (member.accessor === "-")
                            attribute.visibility = "private"
                        else if (member.accessor === "#")
                            attribute.visibility = "protected"

                        rule.rule_specific.attributes.push(attribute)
                    }
                })
                this.rules.push(rule)
            }
        })
    },
    async parse(param) {
        this.reset()

        try {
            this.spinner = true;

            const response = await fetch(`${API_CONFIG.BASE_URL}${param.endpoint}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(param),
            });

            if (response.status !== 200)
                throw new Error('Failed to parse PlantUML code!');

            this.parsedCode = await response.json()
            this.spinner = false;
            this.toastOptions = API_CONFIG.TOAST_OPTIONS.success;
            this.generateRules()
        } catch (error) {
            console.error(error);

            this.toastOptions = {
                ...API_CONFIG.TOAST_OPTIONS.error,
                text: error.message || 'An error occurred.',
            };
            this.parsedCode = {
                error: error.message
            }
            this.spinner = false;
        }
    }
}

const useConverterStore = defineStore('converterStore', {
    state,
    getters,
    actions
});

export default useConverterStore