import rulesExplanations from "@/helpers/rulesExplanations";

export default {
    RULE_TYPE: {
        // CLASS & INTERFACE
        'defined_class': 'defined_class_rule',   
        'defined_enum': 'defined_enum_rule',   

        // GENERALIZATION & SPECIALIZATION
        'generalization': 'generalization_rule',   

        // RELATIONSHIPS
        'simple_association': 'simple_association_rule',   
        'composition': 'composition_rule',   
        'aggregation': 'aggregation_rule',   

        // ASSOCIATION CLASS
        'association_class': 'association_class_rule',   

        // OTHERS
        'combined': 'combined_rule',

        // OPTIONAL
        'nomination_consistency': 'nomination_consistency_rule',   
        'test_association': 'test_association_rule',   
        'count_methods': 'count_methods_rule',   
        'count_attributes': 'count_attributes_rule'   

    },
    RULE_TYPE_JSON: {
        // CLASS & INTERFACE
        'defined_class_rule': {   
            rule_type: 'defined_class_rule',
            rule_name: 'Class definition',
            info_text: rulesExplanations.defined_class_rule,
            info_image: 'assets/rules/defined_class_rule.png',
            feedback: '... no feedback yet',
            points: 0,
            existence: 'presence',
            active: true,
            rule_specific: {
                class_name: "Car",
                exact_match: false,
                abstract: false,
                interface: false,
                methods: [],
                attributes: [],
            }
        },
        // ENUM
        'defined_enum_rule': {   
            rule_type: 'defined_enum_rule',
            rule_name: 'Enum definition',
            info_text: rulesExplanations.defined_class_rule,
            info_image: 'assets/rules/defined_class_rule.png',
            feedback: '... no feedback yet',
            points: 0,
            existence: 'presence',
            active: true,
            rule_specific: {
                enum_class_name: "Car",
                exact_match: false,
                attributes: [],
            }
        },
        // GENERALIZATION & SPECIALIZATION
        'generalization_rule': {   
            rule_type: "generalization_rule",
            rule_name: "Generalization",
            existence: "presence",
            info_text: rulesExplanations.generalization_rule,
            info_image: "assets/rules/generalization_rule.png",
            points: 0,
            feedback: '... no feedback',
            active: true,
            rule_specific: {
                class_child: "Child",
                class_parent: "Parent",
                exact_match: false,
                type: "inheritance" // implementation
            }
        },
        // RELATIONSHIPS
        'simple_association_rule': {   
            rule_type: "simple_association_rule",
            rule_name: "Simple Association",
            existence: "presence",
            info_text: rulesExplanations.simple_association_rule,
            info_image: "assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            active: true,
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
                exact_match: false,
                A_multiplicity: "1",
                B_multiplicity: "1"
            }
        },
        'composition_rule': {   
            rule_type: "composition_rule",
            rule_name: "Composition",
            existence: "presence",
            info_text: rulesExplanations.aggregation_composition_rule,
            info_image: "assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            active: true,
            rule_specific: {
                class_composite: "Composite",
                class_element: "Element",
                exact_match: false,
                element_multiplicity: "*",
            }
        },
        'aggregation_rule': {   
            rule_type: "aggregation_rule",
            rule_name: "Aggregation",
            existence: "presence",
            info_text: rulesExplanations.aggregation_composition_rule,
            info_image: "assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            active: true,
            rule_specific: {
                class_aggregate: "Aggregate",
                class_element: "Element",
                exact_match: false,
                element_multiplicity: "*",
            }
        },
        // ASSOCIATION CLASS
        'association_class_rule': {   
            rule_type: "association_class_rule",
            rule_name: "Association Class",
            existence: "presence",
            info_text: rulesExplanations.association_class_rule,
            info_image: "assets/rules/ass_class.png",
            points: 0,
            feedback: "... Es muss eine Assoziationsklasse C auf der Beziehung zwischen Klasse A und Klasse B haben.",
            active: true,
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
                class_C: "Association Class",
                exact_match: false,
            }
        },
        // OTHERS
        'combined_rule': {
            rule_type: "combined_rule",
            rule_name: "Combined Rule Definition",
            existence: 'presence',
            info_text: rulesExplanations.combined_rule,
            info_image: '',
            points: 0,
            active: true,
            feedback: "... i need a feedback please 😊.",
            rules:[]
        },
        // OPTIONAL
        'nomination_consistency_rule': {   
            rule_type: "nomination_consistency_rule",
            rule_name: "Nomination Consistency",
            info_text: rulesExplanations.nomination_consistency,
            info_image: "",
            active: true,
        },
        'count_methods_rule': {   
            rule_type: "count_methods_rule",
            rule_name: "Count Methods",
            existence: 'absence',
            info_text: rulesExplanations.count_methods_rule,
            info_image: '',
            points: 0,
            active: true,
            rule_specific: {
                methods: 0,
            }
        },
        'count_attributes_rule': {   
            rule_type: "count_attributes_rule",
            rule_name: "Count Attributes",
            existence: 'absence',
            info_text: rulesExplanations.count_attributes_rule,
            info_image: '',
            points: 0,
            active: true,
            rule_specific: {
                attributes: 0,
            }
        },
        'test_association_rule': {   
            rule_type: "test_association_rule",
            rule_name: "Test Association",
            existence: "absence",
            info_text: rulesExplanations.test_association_rule,
            info_image: "assets/rules/relations.png",
            points: 0,
            active: true,
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
                exact_match: false,
            }
        },
    },
    METHODS_TYPE: {
        name: "public_method_name",
        exact_match: false,
        return_type: "void",
        visibility: "public",
        arguments: "",
        points: 0,
        active: true,
        feedback: '... no feedback',
        is_static: false
    },
    ATTRIBUTE_TYPE: {
        name: "attribute_name",
        exact_match: false,
        type: "string",
        visibility: "public",
        points: 0,
        active: true,
        feedback: '... no feedback',
        is_static: false
    },
    ENUM_ATTRIBUTE_TYPE: {
        name: "ENUM_ATTR",
        exact_match: false,
        points: 0,
        active: true,
        feedback: '... no feedback',
    },
    EXISTENCE_TYPE: {
        'presence': 'presence',
        'absence': 'absence'
    },
    GENERALIZATION_TYPE: {
        'inheritance': 'inheritance',
        'implementation': 'implementation'
    },
    COMBINED_RULE_DEFINITION: {
        DEFINE_CLASS : "Class Definition sub-rule",
        METHOD: "Method sub-rule",
        ATTRIBUTE: "Attribute sub-rule"
    },
    COMBINED_RULE_ELEM: {
        DEFINE_CLASS: {
            rule_type: "Class Definition sub-rule",
            name: "Class name",
            exact_match: false,
            abstract: false,
            interface: false,
            active: true,
        },
        METHOD: {
            rule_type: "Method sub-rule",
            name: "Method name",
            exact_match: false,
            return_type: "void",
            visibility: "public",
            arguments: "",
            active: true,
            is_static: false,
            class: "class name"
        },
        ATTRIBUTE: {
            rule_type: "Attribute sub-rule",
            name: "Attribute name",
            exact_match: false,
            type: "string",
            visibility: "public",
            active: true,
            is_static: false,
            class: ""
        },
    }
}