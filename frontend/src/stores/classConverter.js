import {defineStore} from 'pinia';
import {BASE_API_URL} from "@/config/config";
import rulesDefinitions from "@/lib/rulesDefinitions";
import globalUtils from "@/helpers/globalUtils";

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
    },
    GReQLGeneratedCode: ""
})

const getters = {
    getParsedCode: (state) => {
        return state.parsedCode
    },
    isSpinning: (state) => state.spinner,
    getRules: (state) => state.rules,
    getOffCanvas: (state) => state.offCanvas,
    getGReQLGeneratedCode: (state) => state.GReQLGeneratedCode
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
    setGReQLGeneratedCode (code){
      this.GReQLGeneratedCode = code
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
            // CLASS , ENUM, INTERFACE
            let rule;
            if (elem.name && elem.title) {
                if (elem.stereotypes.includes("enum"))
                    rule = this.generateEnumRule(elem);
                else
                    rule = this.generateClassRule(elem);
            }
            // GENERALIZATION & SPECIALIZATION
            else if (elem.leftArrowHead.includes("<|"))
                rule = this.generateGeneralizationRule(elem)

            // SIMPLE ASSOCIATION
            else if (globalUtils.isStringEmpty(elem.leftArrowHead) && globalUtils.isStringEmpty(elem.rightArrowHead)
                && elem.leftArrowBody.includes("-") && elem.rightArrowBody.includes("-"))
                rule = this.generateSimpleAssociationRule(elem)

            // AGGREGATION
            else if (elem.leftArrowHead.includes("o")){
                rule = this.generateAggregationRule(elem)
            }
            // COMPOSITION
            else if (elem.leftArrowHead.includes("*")){
                rule = this.generateCompositionRule(elem)
            }
            // ASSOCIATED CLASS
            else if(elem.leftType.includes("UseCase") && elem.leftArrowBody.includes(".") && elem.rightArrowBody.includes("."))
                rule = this.generateAssociationClassRule(elem)

            if(rule !== undefined)
                this.rules.push(rule);
        });

    },

    generateAssociationClassRule(elem){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.association_class_rule))
        const classes = globalUtils.split(elem.left)
        rule.rule_specific.class_A = classes[0]
        rule.rule_specific.class_B = classes[1]
        rule.rule_specific.class_C = elem.right
        rule.feedback = `Es muss eine Assoziationsklasse ${elem.right} auf der Beziehung zwischen Klasse ${classes[0]} und Klasse ${classes[1]} haben.`
        return rule
    },
    generateAggregationRule(elem){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.aggregation_rule))
        rule.rule_specific.class_aggregate = elem.left
        rule.rule_specific.class_element = elem.right
        rule.rule_specific.aggregate_multiplicity = globalUtils.isStringEmpty(elem.leftCardinality) ? "1" : elem.leftCardinality
        rule.rule_specific.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
        rule.feedback = `Es sollte eine Aggregationsbeziehung zwischen ${elem.left} und ${elem.right} bestehen, in der ${elem.left} das Aggregat und ${elem.right} das Element ist.`
        return rule
    },
    generateCompositionRule(elem){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.composition_rule))
        rule.rule_specific.class_composite = elem.left
        rule.rule_specific.class_element = elem.right
        rule.rule_specific.composite_multiplicity = globalUtils.isStringEmpty(elem.leftCardinality) ? "1" : elem.leftCardinality
        rule.rule_specific.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
        rule.feedback = `Es sollte eine Kompositionsbeziehung zwischen ${elem.left} und ${elem.right} bestehen, in der ${elem.left} das Komposite und ${elem.right} das Element ist.`
        return rule
    },
    generateSimpleAssociationRule(elem){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.simple_association_rule))
        rule.rule_specific.class_A = elem.left
        rule.rule_specific.class_B = elem.right
        rule.rule_specific.A_multiplicity = globalUtils.isStringEmpty(elem.leftCardinality) ? "1" : elem.leftCardinality
        rule.rule_specific.B_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
        rule.feedback = `Es sollte eine Associationsbeziehung zwischen ${elem.left} und ${elem.right} bestehen.`
        return rule
    },
    generateGeneralizationRule(elem){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.generalization_rule))
        rule.rule_specific.class_parent = elem.left
        rule.rule_specific.class_child = elem.right

        if(elem.leftArrowBody === "-" && elem.rightArrowBody === "-"){
            rule.rule_specific.type = rulesDefinitions.GENERALIZATION_TYPE.inheritance
            rule.feedback = `Das Diagramm sollte eine Klasse ${elem.right} enthalten, die von einer Oberklasse ${elem.left} erbt.`
        }
        else if(elem.leftArrowBody === "." && elem.rightArrowBody === "."){
            rule.rule_specific.type = rulesDefinitions.GENERALIZATION_TYPE.implementation
            rule.feedback = `Das Diagramm sollte eine Klasse/Schnittstelle ${elem.right} enthalten, die einer Schnittstelle ${elem.left} implementiert.`
        }
        return rule;
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

        let abstractText = ""
        if (elem.isAbstract) {
            rule.rule_specific.abstract = elem.isAbstract;
            abstractText = "abstracte "
        }

        if (elem.stereotypes.includes("interface")) {
            rule.rule_specific.interface = true;
        }

        elem.members.forEach((member) => {
            // METHODS
            if (member.returnType) {
                const method = JSON.parse(JSON.stringify(rulesDefinitions.METHODS_TYPE));
                method.name = member.name;
                method.return_type = member.returnType;
                method.arguments = member._arguments;

                method.visibility = this.getVisibility(member.accessor);
                method.feedback = `Die Klasse ${rule.rule_specific.class_name} soll eine Methode namens ${method.name} bereitstellen.`;

                rule.rule_specific.methods.push(method);
            }
            // ATTRIBUTES
            else if (member.type) {
                console.log(member)
                const attribute = JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE));
                attribute.name = member.name;
                attribute.type = member.type;

                attribute.visibility = this.getVisibility(member.accessor);
                attribute.feedback = `Die Klasse ${rule.rule_specific.class_name} soll ein ${attribute.visibility} Attribut für die Eigenschaft ${attribute.name} und type ${attribute.type} bereitstellen.`;

                rule.rule_specific.attributes.push(attribute);
            }
        });

        rule.feedback = `Es soll eine ${abstractText} Klasse mit der Name ${rule.rule_specific.class_name} bereitgestellt werden.`;
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

const useClassConverterStore = defineStore('classConverterStore', {
    state,
    getters,
    actions
});

export default useClassConverterStore