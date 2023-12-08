import {defineStore} from 'pinia';
import {BASE_API_URL} from "@/config/config";
import rulesDefinitions from "@/lib/rulesDefinitions";
import globalUtils from "@/helpers/globalUtils";
import GReQLRulesgenerator from "@/lib/bouml/GReQLRulesgenerator";
import xmlFormat from "xml-formatter";

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
        image: "",
        code: undefined
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
    reset() {
        this.code = ""
        this.parsedCode = undefined
        this.rules = []
    },
    setOffCanvas(rule, code) {
        this.offCanvas = {
            title: rule.rule_name,
            info: rule.info_text,
            image: rule.info_image,
        }
        if(code !== undefined)
            this.offCanvas.code = xmlFormat(GReQLRulesgenerator.generateGReQLRule(code))
        else
            this.offCanvas.code = code
    },
    setGReQLGeneratedCode(code) {
        this.GReQLGeneratedCode = code
    },
    deleteRule(rule) {
        this.rules = this.rules.filter(r => {
            return r !== rule
        })
    },
    disableRule(rule){
        this.rules.forEach(r => {
            if(r === rule)
                r.active = false;
        })
    },
    activateRule(rule){
        this.rules.forEach(r => {
            if(r === rule)
                r.active = true;
        })
    },
    addRule(rule) {
        this.rules.push(rule)
    },

    annotationConverter(input){
        const result = {};

        result["p"] = 0
        result["mdp"] = 0
        result["adp"] = 0
        result["cID"] = -1

        result.classMatch = /!class/.test(input);
        result.ignoreClass = /!ignoreClass/.test(input);

        const attrMatch = /!attr\((.*?)\)/.exec(input);
        if (attrMatch) {
            const attrValue = attrMatch[1].trim();
            result.attr = attrValue === '*' ? '*' : attrValue.split(',').map(Number);
        } else
            result.attr = [];

        const methodMatch = /!method\((.*?)\)/.exec(input);
        if (methodMatch) {
            const methodValue = methodMatch[1].trim();
            result.method = methodValue === '*' ? '*' : methodValue.split(',').map(Number);
        } else
            result.method = [];

        const combineMatch = /combineID=(\d+)/.exec(input);
        if (combineMatch) {
            result.cID = parseInt(combineMatch[1]);
        } else
            result.cID = -1;


        const regex = /(\d+) (point|points) for (\w+)/g;
        let match;
        while ((match = regex.exec(input)) !== null) {
            const points = parseInt(match[1]);
            const name = match[3];
            if (name === "rule")
                result.p = points;
            else if (name === "method" || name === "methods")
                result.mdp = points;
            else if (name === "attribute" || name === "attributes")
                result.adp = points;
        }


        return result;
    },
    generateRules() {
        const elements = this.parsedCode[0].elements;
        let combinedElements = []
        elements.forEach((elem) => {
            if(elem.label)
                if(elem.label.includes("combineID")){
                    combinedElements.push(elem)
                    return;
                }

            if(elem.generics)
                if(elem.generics.length > 0)
                    if(elem.generics[0].includes("combineID")){
                        combinedElements.push(elem)
                        return;
                }

            let rule;
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.defined_enum)
                rule = this.generateEnumRule(elem);
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.defined_class)
                rule = this.generateClassRule(elem);
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.generalization)
                rule = this.generateGeneralizationRule(elem)
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.simple_association)
                rule = this.generateSimpleAssociationRule(elem)
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.aggregation)
                rule = this.generateAggregationRule(elem)
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.composition)
                rule = this.generateCompositionRule(elem)
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.association_class)
                rule = this.generateAssociationClassRule(elem)

            if (rule !== undefined)
                this.rules.push(rule);
        });

        this.classifyAndGenerateCombineRules(combinedElements)
    },

    identifyRuleType(elem){
        if(elem.name && elem.title)
            if (elem.stereotypes.includes("enum"))
                return rulesDefinitions.RULE_TYPE.defined_enum
            else
                return rulesDefinitions.RULE_TYPE.defined_class
        else if( elem.leftArrowHead.includes("<|"))
            return  rulesDefinitions.RULE_TYPE.generalization

        else if (globalUtils.isStringEmpty(elem.leftArrowHead) && globalUtils.isStringEmpty(elem.rightArrowHead)
            && elem.leftArrowBody.includes("-") && elem.rightArrowBody.includes("-"))
            return rulesDefinitions.RULE_TYPE.simple_association

        else if (elem.leftArrowHead.includes("o"))
            return rulesDefinitions.RULE_TYPE.aggregation

        else if (elem.leftArrowHead.includes("*"))
            return rulesDefinitions.RULE_TYPE.composition

        else if (elem.leftType.includes("UseCase") && elem.leftArrowBody.includes(".") && elem.rightArrowBody.includes("."))
            return rulesDefinitions.RULE_TYPE.association_class
        else {
            console.error("Cannot identify rule")
            return null
        }
    },
    generateAssociationClassRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.association_class_rule))
        const classes = globalUtils.split(elem.left)
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        rule.rule_specific.class_A = classes[0]
        rule.rule_specific.class_B = classes[1]
        rule.rule_specific.class_C = elem.right
        rule.feedback = `Es muss eine Assoziationsklasse ${elem.right} auf der Beziehung zwischen Klasse ${classes[0]} und Klasse ${classes[1]} haben.`
        return rule
    },
    generateAggregationRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.aggregation_rule))
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        rule.rule_specific.class_aggregate = elem.left
        rule.rule_specific.class_element = elem.right
        rule.rule_specific.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
        rule.feedback = `Es sollte eine Aggregationsbeziehung zwischen ${elem.left} [1] und ${elem.right} [${rule.rule_specific.element_multiplicity}] bestehen, in der ${elem.left} das Aggregat und ${elem.right} das Element ist.`
        return rule
    },
    generateCompositionRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.composition_rule))
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        rule.rule_specific.class_composite = elem.left
        rule.rule_specific.class_element = elem.right
        rule.rule_specific.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
        rule.feedback = `Es sollte eine Kompositionsbeziehung zwischen ${elem.left} [1] und ${elem.right} [${rule.rule_specific.element_multiplicity}] bestehen, in der ${elem.left} das Komposite und ${elem.right} das Element ist.`
        return rule
    },
    generateSimpleAssociationRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.simple_association_rule))
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        if (globalUtils.isStringEmpty(elem.leftCardinality) && globalUtils.isStringEmpty(elem.rightCardinality))
            return this.generateTestAssociationRule(elem)
        else {
            rule.rule_specific.A_multiplicity = globalUtils.isStringEmpty(elem.leftCardinality) ? "1" : elem.leftCardinality
            rule.rule_specific.B_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "1" : elem.rightCardinality
        }
        rule.rule_specific.class_A = elem.left
        rule.rule_specific.class_B = elem.right

        rule.feedback = `Es sollte eine Associationsbeziehung zwischen ${elem.left} [${elem.rightCardinality}] und ${elem.right} [${elem.leftCardinality}] bestehen.`
        return rule
    },
    generateTestAssociationRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.test_association_rule))
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        rule.rule_specific.class_A = elem.left
        rule.rule_specific.class_B = elem.right

        rule.existence = "presence"
        return rule
    },
    generateGeneralizationRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.generalization_rule))
        const annotation_rules = this.annotationConverter(elem.label)
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        rule.rule_specific.class_parent = elem.left
        rule.rule_specific.class_child = elem.right

        if (elem.leftArrowBody === "-" && elem.rightArrowBody === "-") {
            rule.rule_specific.type = rulesDefinitions.GENERALIZATION_TYPE.inheritance
            rule.feedback = `Das Diagramm sollte eine Klasse ${elem.right} enthalten, die von einer Oberklasse ${elem.left} erbt.`
        } else if (elem.leftArrowBody === "." && elem.rightArrowBody === ".") {
            rule.rule_specific.type = rulesDefinitions.GENERALIZATION_TYPE.implementation
            rule.feedback = `Das Diagramm sollte eine Klasse/Schnittstelle ${elem.right} enthalten, die einer Schnittstelle ${elem.left} implementiert.`
        }
        return rule;
    },
    generateEnumRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_enum_rule));
        const annotation_rules = this.annotationConverter(elem.generics[0])

        rule.rule_specific.enum_class_name = elem.name;
        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch
        let index = 0
        elem.members.forEach((member) => {
            const attribute = JSON.parse(JSON.stringify(rulesDefinitions.ENUM_ATTRIBUTE_TYPE));
            attribute.name = member.name;
            attribute.points = annotation_rules.adp
            if(annotation_rules.attr === '*')
                attribute.exact_match = true
            else if (annotation_rules.attr.includes(index))
                attribute.exact_match = true

            attribute.feedback = `Die Enum ${rule.rule_specific.enum_class_name} soll ein Attribut für die Eigenschaft ${attribute.name} bereitstellen.`;
            rule.rule_specific.attributes.push(attribute);
            index++
        });
        rule.feedback = `Es soll eine Enum mit der Name ${rule.rule_specific.enum_class_name} bereitgestellt werden.`;
        return rule;
    },
    generateClassRule(elem) {
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.defined_class_rule));
        rule.rule_specific.class_name = elem.name;
        const annotation_rules = this.annotationConverter(elem.generics[0])

        rule.points = annotation_rules.p
        rule.rule_specific.exact_match = annotation_rules.classMatch

        let abstractText = ""
        if (elem.isAbstract) {
            rule.rule_specific.abstract = elem.isAbstract;
            abstractText = "abstracte "
        }

        if (elem.stereotypes.includes("interface"))
            rule.rule_specific.interface = true;


        let attr_index = 0
        let method_index = 0
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
                if(annotation_rules.method === '*')
                    method.exact_match = true
                else if (annotation_rules.method.includes(method_index))
                    method.exact_match = true
                method.points = annotation_rules.mdp
                method_index++
            }
            // ATTRIBUTES
            else if (member.type) {
                const attribute = JSON.parse(JSON.stringify(rulesDefinitions.ATTRIBUTE_TYPE));
                attribute.name = member.name;
                attribute.type = member.type;

                attribute.visibility = this.getVisibility(member.accessor);
                attribute.feedback = `Die Klasse ${rule.rule_specific.class_name} soll ein ${attribute.visibility} Attribut für die Eigenschaft ${attribute.name} und type ${attribute.type} bereitstellen.`;

                rule.rule_specific.attributes.push(attribute);
                if(annotation_rules.attr === '*')
                    attribute.exact_match = true
                else if (annotation_rules.attr.includes(attr_index))
                    attribute.exact_match = true
                attribute.points = annotation_rules.adp
                attr_index++
            }
        });

        const entityName = rule.rule_specific.interface === true ? "Interface" : "Klasse"
        rule.feedback = `Es soll eine ${abstractText} ${entityName} mit der Name ${rule.rule_specific.class_name} bereitgestellt werden.`;
        return rule;
    },

    classifyAndGenerateCombineRules(elemList){
        elemList.forEach(elem => {
            if(elem.label)
                elem["annotation"] = this.annotationConverter(elem.label)
            else if (elem.generics)
                elem["annotation"] = this.annotationConverter(elem.generics[0])
        })

        const groupedElements = this.groupBycID(elemList)
        groupedElements.forEach(list => {
            this.generateCombineRule(list)
        })
    },
    generateCombineRule(elemList){
        const rule = JSON.parse(JSON.stringify(rulesDefinitions.RULE_TYPE_JSON.combined_rule))
        rule.rule_name += ` : # ${elemList.id}`
        let points = 0
        elemList.elements.forEach(elem => {
            points = elem.annotation.p > points ? elem.annotation.p : points
            let subRule
            if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.generalization){
                subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.GENERALIZATION))

                if (elem.leftArrowBody === "-" && elem.rightArrowBody === "-")
                    subRule.type = rulesDefinitions.GENERALIZATION_TYPE.inheritance
                else
                    subRule.type = rulesDefinitions.GENERALIZATION_TYPE.implementation

                subRule.exact_match = elem.annotation.classMatch
                subRule.class_parent = elem.left
                subRule.class_child = elem.right
            }
            else if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.composition){
                subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.COMPOSITION))

                subRule.exact_match = elem.annotation.classMatch
                subRule.class_composite = elem.left
                subRule.class_element = elem.right
                subRule.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
            }
            else if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.aggregation){
                subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.AGGREGATION))

                subRule.exact_match = elem.annotation.classMatch
                subRule.class_aggregate = elem.left
                subRule.class_element = elem.right
                subRule.element_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "*" : elem.rightCardinality
            }
            else if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.simple_association){
                if (globalUtils.isStringEmpty(elem.leftCardinality) && globalUtils.isStringEmpty(elem.rightCardinality))
                    subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.TEST_ASSOCIATION))
                else{
                    subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.SIMPLE_ASSOCIATION))
                    subRule.A_multiplicity = globalUtils.isStringEmpty(elem.leftCardinality) ? "1" : elem.leftCardinality
                    subRule.B_multiplicity = globalUtils.isStringEmpty(elem.rightCardinality) ? "1" : elem.rightCardinality
                }
                subRule.exact_match = elem.annotation.classMatch
                subRule.class_A = elem.left
                subRule.class_B = elem.right
            }
            else if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.association_class){
                subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.ASSOCIATION_CLASS))

                const classes = globalUtils.split(elem.left)
                subRule.exact_match = elem.annotation.classMatch
                subRule.class_A = classes[0]
                subRule.class_B = classes[1]
                subRule.class_C = elem.right
            } else if(this.identifyRuleType(elem) === rulesDefinitions.RULE_TYPE.defined_class){
                if(!elem.annotation.ignoreClass){
                    subRule = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.DEFINE_CLASS))

                    subRule.name = elem.name;
                    subRule.exact_match = elem.annotation.classMatch
                    if (elem.isAbstract)
                        subRule.abstract = elem.isAbstract;

                    if (elem.stereotypes.includes("interface"))
                        subRule.interface = true;
                }

                let attr_index = 0
                let method_index = 0
                elem.members.forEach((member) => {
                    // METHODS
                    if (member.returnType) {
                        const method = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.METHOD));
                        method.name = member.name
                        method.class = elem.name
                        method.return_type = member.returnType
                        method.arguments = member._arguments

                        method.visibility = this.getVisibility(member.accessor)

                        if(elem.annotation.method === '*')
                            method.exact_match = true
                        else if (elem.annotation.method.includes(method_index))
                            method.exact_match = true
                        method_index++
                        rule.rules.push(method)
                    }
                    // ATTRIBUTES
                    else if (member.type) {
                        const attribute = JSON.parse(JSON.stringify(rulesDefinitions.COMBINED_RULE_ELEM.ATTRIBUTE));
                        attribute.name = member.name
                        attribute.type = member.type
                        attribute.class = elem.name

                        attribute.visibility = this.getVisibility(member.accessor);

                        if(elem.annotation.attr === '*')
                            attribute.exact_match = true
                        else if (elem.annotation.attr.includes(attr_index))
                            attribute.exact_match = true
                        attr_index++
                        rule.rules.push(attribute)
                    }
                });
            }
            if(subRule !== undefined)
                rule.rules.push(subRule)
        })

        rule.points = points
        this.rules.push(rule)
    },

    groupBycID(elements) {
        const group = {};
        elements.forEach(element => {
            const id  = element.annotation.cID;
            if (!group[id])
                group[id] = [];
            group[id].push(element);
        });

        return Object.keys(group).map(id => ({
            id: parseInt(id, 10),
            elements: group[id],
        }));
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