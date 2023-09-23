export default {
    RULE_TYPE: {
        // CLASS & INTERFACE
        'defined_class': 'defined_class_rule',
        'count_attributes': 'count_attributes_rule',
        'count_methods': 'count_methods_rule',

        // RELATIONSHIPS
        'simple_association': 'simple_association_rule',
        'cardinality_association': 'cardinality_association_rule',
        'no_association' : 'no_association_rule',
        'oriented_association': 'oriented_association_rule',
        'composition_association': 'composition_association_rule',
        'aggregation_association': 'aggregation_association_rule',

        // ASSOCIATION CLASS
        'class_association': 'class_association_rule',

        // GENERALIZATION & SPECIALIZATION
        'has_generalization': 'has_generalization_rule',
        'A_to_B_generalization': 'A_to_B_generalization'
    },
    RULE_TYPE_JSON: {
        // CLASS & INTERFACE
        'defined_class_rule' : {
            rule_type: 'defined_class_rule',
            rule_name: 'Class definition',
            info_text: 'Diese Regel leitet aus Ihrem Diagramm die Regeln ab, die mit jeder Klasse oder Schnittstelle' +
                ' verbunden sein sollten.',
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
        'count_attributes_rule' : {
            rule_type: "count_attributes_rule",
            rule_name: "Count Attribute",
            existence: 'presence',
            info_text: 'Diese Regel überprüft, ob das Modell genau N Attribute enthält.',
            info_image: 'src/assets/rules/testattribute.png',
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_name: "Car",
                attributes: 0,
            }
        },
        'count_methods_rule' : {
            rule_type: "count_methods_rule",
            rule_name: "Count Methods",
            existence: 'presence',
            info_text: 'Diese Regel überprüft, ob das Modell genau N Methoden enthält.',
            info_image: 'src/assets/rules/testmethods.png',
            points: 0,
            feedback: '... no feedback',
            rule_specific: {
                class_name: "Car",
                methods: 0,
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
        'class_association_rule' : {},

        // GENERALIZATION & SPECIALIZATION
        'has_generalization_rule' : {},
        'A_to_B_generalization' : {}
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
    EXISTENCE_TYPE: {
        'presence': 'presence',
        'absence' : 'absence'
    },
    CARDINALITY_TYPE: {
        'one_to_one' : 'one_to_one',
        'one_to_many': 'one_to_many',
        'many_to_many': 'many_to_many'
    },
}