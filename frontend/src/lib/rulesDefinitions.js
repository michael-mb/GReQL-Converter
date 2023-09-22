export default {
    RULE_TYPE: {
        // CLASS & INTERFACE
        'defined_class': 'defined_class_rule',
        'count_attributes': 'count_attributes_rule',
        'count_methods': 'count_methods_rule',

        /**
        'attribute_class': 'class_with_attributes_rule', --
        'methods_class': 'class_with_methods_rule', --
        'abstract_class': 'abstract_class_rule',
        'interface': 'interface_rule',
         **/

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
        // ALL PARAMETERS
        // CLASS & INTERFACE
        'defined_class_rule' : {
            rule_type: 'defined_class_rule',
            info_text: 'Diese Regel leitet aus Ihrem Diagramm die Regeln ab, die mit jeder Klasse oder Schnittstelle' +
                ' verbunden sein sollten.',
            info_image: 'src/assets/rules/defined_class_rule.png',
            feedback: '',
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
        // Only when the diagram has more than one attribute
        'count_attributes_rule' : {
            class_name: "Car",
            attributes: 0
        },
        // Only when the diagram has more than one method
        'count_methods_rule' : {
            class_name: "Car",
            methods: 0
        },

        /**
        'class_with_attributes_rule' : {},
        'class_with_methods_rule' : {},
        'abstract_class_rule' : {},
        'interface_rule' : {},
         **/

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
        private: {
            name: "private_method_name",
            return_type: "void",
            visibility: "private"
        },
        public: {
            name: "public_method_name",
            return_type: "void",
            visibility: "public"
        }
    },
    EXISTENCE_TYPE: {
        'presence': 'presence',
        'absence' : 'absence'
    },
    CARDINALITY_TYPE: {
        'one_to_one' : 'one_to_one',
        'one_to_many': 'one_to_many',
        'many_to_many': 'many_to_many'
    }
}