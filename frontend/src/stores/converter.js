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
    rules: [],
    offCanvas: {
        title: "... Test title",
        info: "... information",
        image: ""
    }
})

const getters = {
    getParsedCode: (state) => {
        return state.parsedCode
    },
    isSpinning: (state) => state.spinner,
    getRules: (state) => state.rules,
    getOffCanvas: (state) => state.offCanvas
}

const actions = {
    reset(){
        this.code = ""
        this.parsedCode = undefined
        this.rules = []
    },
    setOffCanvas(rule){
        this.offCanvas = {
            title: rule.rule_name,
            info: rule.info_text,
            image: rule.info_image
        }
    },
    deleteRule(rule) {
        this.rules = this.rules.filter(r => {
            return r !== rule
        })
    },
    addRule(rule){
        this.rules.push(rule)
    },
    generateRules() {
        const elements = this.parsedCode[0].elements;

        elements.forEach((elem) => {
            if (elem.name && elem.title) {
                let rule;

                if (elem.stereotypes.includes("enum")) {
                    rule = this.generateEnumRule(elem);
                } else {
                    rule = this.generateClassRule(elem);
                }

                this.rules.push(rule);
            }
        });
    },

    generateEnumRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_enum_rule));
        rule.rule_specific.enum_class_name = elem.name;

        elem.members.forEach((member) => {
            const attribute = JSON.parse(JSON.stringify(rulesDefinitions.ENUM_ATTRIBUTE_TYPE));
            attribute.name = member.name;

            attribute.feedback = `Die Enum ${rule.rule_specific.enum_class_name} soll ein Attribut für die Eigenschaft ${attribute.name} bereitstellen.`;

            rule.rule_specific.attributes.push(attribute);
        });

        rule.feedback = `Es soll eine Enum mit der Name ${rule.rule_specific.class_name} bereitgestellt werden.`;
        return rule;
    },

    generateClassRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_class_rule));
        rule.rule_specific.class_name = elem.name;

        if (elem.isAbstract) {
            rule.rule_specific.abstract = elem.isAbstract;
        }

        if (elem.stereotypes.includes("interface")) {
            rule.rule_specific.interface = true;
        }

        elem.members.forEach((member) => {
            if (member.returnType) {
                const method = JSON.parse(JSON.stringify(rulesDefinitions.METHODS_TYPE));
                method.name = member.name;
                method.return_type = member.returnType;
                method.arguments = member._arguments;

                method.visibility = this.getVisibility(member.accessor);
                method.feedback = `Die Klasse ${rule.rule_specific.class_name} soll eine Methode namens ${method.name} bereitstellen.`;

                rule.rule_specific.methods.push(method);
            } else if (member.type) {
                const attribute = JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE));
                attribute.name = member.name;
                attribute.type = member.type;

                attribute.visibility = this.getVisibility(member.accessor);
                attribute.feedback = `Die Klasse ${rule.rule_specific.class_name} soll ein Attribut für die Eigenschaft ${attribute.name} bereitstellen.`;

                rule.rule_specific.attributes.push(attribute);
            }
        });

        rule.feedback = `Es soll eine Klasse mit der Name ${rule.rule_specific.class_name} bereitgestellt werden.`;
        return rule;
    },

    getVisibility(accessor) {
        switch (accessor) {
            case '+':
                return 'public';
            case '-':
                return 'private';
            case '#':
                return 'protected';
            default:
                return 'public';
        }
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