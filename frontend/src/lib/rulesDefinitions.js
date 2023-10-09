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
        'composition': 'composition_rule',
        'aggregation': 'aggregation_rule',
        'test_association': 'test_association_rule',

        // ASSOCIATION CLASS
        'association_class': 'association_class_rule',

        // OPTIONAL
        'nomination_consistency': 'nomination_consistency_rule'
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
        // METHOD RULE
        'count_methods_rule' : { // Done *
            rule_type: "count_methods_rule",
            rule_name: "Count Methods",
            existence: 'absence',
            info_text: rulesExplanations.count_methods_rule,
            info_image: '',
            points: 0,
            rule_specific: {
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
        // RELATIONSHIPS
        'simple_association_rule': {
            rule_type: "simple_association_rule",
            rule_name: "Simple Association",
            existence: "presence",
            info_text: rulesExplanations.simple_association_rule,
            info_image: "src/assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
                A_multiplicity: "1",
                B_multiplicity: "1"
            }
        },
        'composition_rule' : {
            rule_type: "composition_rule",
            rule_name: "Composition",
            existence: "presence",
            info_text: rulesExplanations.aggregation_composition_rule,
            info_image: "src/assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            rule_specific: {
                class_composite: "Composite",
                class_element: "Element",
                composite_multiplicity: "1",
                element_multiplicity: "*",
            }
        },
        'aggregation_rule' : {
            rule_type: "aggregation_rule",
            rule_name: "Aggregation",
            existence: "presence",
            info_text: rulesExplanations.aggregation_composition_rule,
            info_image: "src/assets/rules/relations.png",
            points: 0,
            feedback: "... no feedback",
            rule_specific: {
                class_aggregate: "Aggregate",
                class_element: "Element",
                aggregate_multiplicity: "1",
                element_multiplicity: "*",
            }
        },
        'test_association_rule' : { // Done *
            rule_type: "test_association_rule",
            rule_name: "Test Association",
            existence: "absence",
            info_text: rulesExplanations.test_association_rule,
            info_image: "src/assets/rules/relations.png",
            points: 0,
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
            }
        },

        // ASSOCIATION CLASS
        'association_class_rule' : {
            rule_type: "association_class_rule",
            rule_name: "Association Class",
            existence: "presence",
            info_text: rulesExplanations.association_class_rule,
            info_image: "src/assets/rules/ass_class.png",
            points: 0,
            feedback: "... Es muss eine Assoziationsklasse C auf der Beziehung zwischen Klasse A und Klasse B haben.",
            rule_specific: {
                class_A: "Class A",
                class_B: "Class B",
                class_C: "Class C"
            }
        },
        // OPTIONAL
        'nomination_consistency' : { // Done *
            rule_type: "nomination_consistency_rule",
            rule_name: "Nomination Consistency",
            info_text: rulesExplanations.nomination_consistency,
            info_image: "",
            points: 0
        },
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
    GENERALIZATION_TYPE: {
        'inheritance': 'inheritance',
        'implementation': 'implementation'
    }
}