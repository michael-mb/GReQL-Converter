import rulesExplanations from "@/helpers/rulesExplanations";

export default {
    RULE_TYPE: {
        // CLASS & INTERFACE
        'defined_class': 'defined_class_rule',
        'defined_enum': 'defined_enum_rule',
        'count_attributes': 'count_attributes_rule',
        'count_methods': 'count_methods_rule',

        // GENERALIZATION & SPECIALIZATION
        'has_generalization_child': 'has_generalization_child_rule',
        'generalization': 'generalization_rule',

        // RELATIONSHIPS
        'simple_association': 'simple_association_rule',
        'cardinality_association': 'cardinality_association_rule',
        'no_association' : 'no_association_rule',
        'oriented_association': 'oriented_association_rule',
        'composition_association': 'composition_association_rule',
        'aggregation_association': 'aggregation_association_rule',

        // ASSOCIATION CLASS
        'class_association': 'class_association_rule'
    },
    RULE_TYPE_JSON: {
        // CLASS & INTERFACE
        'defined_class_rule' : {
            rule_type: 'defined_class_rule',
            rule_name: 'Class definition',
            info_text: rulesExplanations.defined_class_rule,
            info_image: 'src/assets/rules/defined_class_rule.png',
            feedback: '... no feedback yet',
            points: 0,
            existence: 'presence',
            rule_specific: {
                class_name: "Car",
                abstract: false,
                interface: false,
                methods: [],
                attributes: [],
            }
        },
        // ENUM
        'defined_enum_rule' : {
            rule_type: 'defined_enum_rule',
            rule_name: 'Enum definition',
            info_text: rulesExplanations.defined_class_rule,
            info_image: 'src/assets/rules/defined_class_rule.png',
            feedback: '... no feedback yet',
            points: 0,
            existence: 'presence',
            rule_specific: {
                enum_class_name: "Car",
                attributes: [],
            }
        },
        // ATTRIBUTE RULE
        'count_attributes_rule' : {
            rule_type: "count_attributes_rule",
            rule_name: "Count Attribute",
            existence: 'presence',
            info_text: rulesExplanations.count_attributes_rule,
            info_image: '',
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_name: "Car",
                attributes: 0,
            }
        },
        // METHOD RULE
        'count_methods_rule' : {
            rule_type: "count_methods_rule",
            rule_name: "Count Methods",
            existence: 'presence',
            info_text: rulesExplanations.count_methods_rule,
            info_image: '',
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_name: "Car",
                methods: 0,
            }
        },
        // GENERALIZATION & SPECIALIZATION
        'generalization_rule' : {
            rule_type: "generalization_rule",
            rule_name: "Generalization",
            existence: "presence",
            info_text: rulesExplanations.generalization_rule,
            info_image: "src/assets/rules/generalization_rule.png",
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_child: "Child",
                class_parent: "Parent",
                type: "inheritance" // implementation
            }
        },
        // HAS GENERALIZATION CHILD
        'has_generalization_child_rule' : {
            rule_type: "has_generalization_child_rule",
            rule_name: "Has Generalization",
            existence: "presence",
            info_text: rulesExplanations.has_generalization_child_rule,
            info_image: "src/assets/rules/generalization_mini.png",
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_name: "Parent",
                type: "inheritance",
                number: 1
            }
        },

        // RELATIONSHIPS
        'simple_association_rule'  : {},
        'cardinality_association_rule' : {},
        'no_association_rule' : {},
        'oriented_association_rule' : {},
        'composition_association_rule' : {},
        'aggregation_association_rule' : {},

        // ASSOCIATION CLASS
        'class_association_rule' : {}

    },
    METHODS_TYPE: {
        name: "public_method_name",
        return_type: "void",
        visibility: "public",
        arguments: "",
        points: 0,
        feedback: '... no feedback',
        is_static: false
    },
    ATTRIBUTE_TYPE: {
        name: "attribute_name",
        type: "string",
        visibility: "public",
        points: 0,
        feedback: '... no feedback',
        is_static: false
    },
    ENUM_ATTRIBUTE_TYPE: {
        name: "ENUM_ATTR",
        points: 0,
        feedback: '... no feedback',
    },
    EXISTENCE_TYPE: {
        'presence': 'presence',
        'absence' : 'absence'
    },
    CARDINALITY_TYPE: {
        'one_to_one' : 'one_to_one',
        'one_to_many': 'one_to_many',
        'many_to_many': 'many_to_many'
    },
    GENERALIZATION_TYPE: {
        'inheritance': 'inheritance',
        'implementation': 'implementation'
    }
}