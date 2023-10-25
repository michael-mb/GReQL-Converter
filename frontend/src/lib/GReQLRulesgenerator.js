import rulesDefinitions from "@/lib/rulesDefinitions";

export default {
    generateGReQLRules: function (rules) {
        console.log("rules:", rules)
        let code = ""
        rules.forEach(rule => {
            switch (rule.rule_type) {
                case 'defined_class_rule':
                    code += this.generateDefineClassRule(rule)
                    break
                case 'defined_enum_rule':
                    code += this.generateEnumRule(rule)
                    break
                case 'generalization_rule':
                    code += this.generateGeneralizationRule(rule)
                    break
                case 'composition_rule':
                    code += this.generateCompositionRule(rule)
                    break
                case 'aggregation_rule':
                    code += this.generateAggregationRule(rule)
                    break
                case 'test_association_rule':
                    code += this.generateTestAssociationRule(rule)
                    break
                case 'association_class_rule':
                    code += this.generateAssociationClassRule(rule)
                    break
                case 'count_methods_rule':
                    code += this.generateCountMethodsRule(rule)
                    break
                case 'count_attributes_rule':
                    code += this.generateCountAttributeRule(rule)
                    break
                case 'simple_association_rule':
                    code += this.generateSimpleAssociationRule(rule)
                    break
                case 'nomination_consistency_rule':
                    code += this.generateNominationConsistencyRule()
                    break
                default:
                    code += `<!-- ${rule.rule_type} + " - Not supported 😢" -->`
                    console.log(rule.rule_type + " - Not supported 😢")
            }
        })
        return "<checkerrules>" + code + "</checkerrules>"
    },

    generateDefineClassRule: function (rule) {
        const isInterface = rule.rule_specific.interface
        let code = ""
        if (isInterface) {
            code += "<!-- Interface Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from x : V{Interface} 
                               with 
                               isDefined(x.name) and  
                               stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 
                              report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                     </rule>`
        } else {
            const isAbstract = rule.rule_specific.abstract

            let abstractCode
            if (isAbstract)
                abstractCode = `and x.isAbstract`
            else
                abstractCode = `and (not x.isAbstract)`
            code += "<!-- Class Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from x : V{Class} 
                               with
                               isDefined(x.name) and  
                               stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 
                               ${abstractCode}
                               report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                    </rule>`
        }

        if(rule.rule_specific.attributes.length !== 0){
            rule.rule_specific.attributes.forEach(attribute => {
                code += this.generateAttributeRule(rule, attribute)
            })
        }

        if(rule.rule_specific.methods.length !== 0){
            rule.rule_specific.methods.forEach(method => {
                code += this.generateMethodRule(rule, method)
            })
        }

        return code
    },
    generateAttributeRule: function (rule, attribute) {
        /***
         1- Only 3 primitive type are working  Integer - Boolean - String
         2- GReQL Engine cannot handle this case from BOUML XMI
         */
        let code = ""
        code += "<!-- Attribute Rule -->"

        const visibility = this.getVisibility(attribute)
        const isStatic = this.isStatic(attribute)
        const primitiveType = this.getType(attribute.type)

        let vType = "from x: V{Class}, y : V{Property}"
        let vTypeText = ""
        if (primitiveType !== '!prim') {
            vType = "from x : V{Class}, y : V{Property}, z : V{PrimitiveType}"
            vTypeText = `and y --> z and isDefined(z.name) and z.name="${primitiveType}"`
        }

        code += `<rule type="presence" points="${attribute.points}">
                    <query>${vType}
                           with
                           isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 and 
                           x --> y and isDefined(y.name) and stringLevenshteinDistance(y.name, "${attribute.name}")&lt;3 and
                           ${visibility}
                           ${isStatic}
                           ${vTypeText}
                           report 1 end
                    </query>
                    <feedback>${attribute.feedback}</feedback>
              </rule>`

        return code
    },
    generateMethodRule: function (rule, method) {

        let code = ""
        const visibility = this.getVisibility(method)
        const isStatic = this.isStatic(method)
        const retType = this.getType(method.return_type)

        /***
         1- Only 3 primitive type are working  Integer - Boolean - String
         */

        let vType = "from x: V{Class}, y : V{Operation}"
        let vTypeText = ""
        if (retType !== '!prim') {
            vType = "from x : V{Class}, y : V{Operation}, ret: V{Parameter}, retType: V{PrimitiveType}"
            vTypeText = ` and y --> ret and isDefined(ret.name) and ret.name="return"  and ret --> retType and isDefined(retType.name) and retType.name="${retType}"`
        }

        code += "<!-- Method Rule -->"
        code += `<rule type="presence" points="${method.points}">
                    <query>${vType}
                           with
                           isDefined(x.name) and x.name="${rule.rule_specific.class_name}" and
                           isDefined(y.name) and stringLevenshteinDistance(y.name, "${method.name}")&lt;3 and
                           ${visibility}
                           ${isStatic} and
                           x --> y 
                           ${vTypeText}
                           report 1 end
                    </query>
                    <feedback>${method.feedback}</feedback>
                  </rule>`

        this.extractVariableNames(method.arguments).forEach( arg => {
            code += "<!-- Method Param -->"
            code += `<rule type="presence" points="0">
                    <query>from x: V{Class}, y : V{Operation}, param: V{Parameter}
                           with
                           isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 and
                           isDefined(y.name) and stringLevenshteinDistance(y.name, "${method.name}")&lt;3 and
                           x --> y and
                           y --> param and isDefined(param.name) and param.name="${arg}" 
                           report 1 end
                    </query>
                    <feedback>Die Methode ${method.name} muss ein Attribut ${arg} haben.</feedback>
                  </rule>`
        })
        return code
    },

    generateEnumRule: function (rule){
        let code = ""
        code += "<!-- Enum Definition-->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x : V{Enumeration}
                        with
                        isDefined(x.name) and
                        stringLevenshteinDistance(x.name, "${rule.rule_specific.enum_class_name}")&lt;3
                        report 1 end
                    </query>
                    <feedback>${rule.feedback}</feedback>
                 </rule>`
        rule.rule_specific.attributes.forEach(attr => {
            code += "<!-- Enum Attribute Definition-->"
            code += `<rule type="presence" points="${attr.points}">
                         <query>
                             from x : V{Enumeration}, y: V{EnumerationLiteral}
                             with
                             isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.enum_class_name}")&lt;3 and
                             isDefined(y.name) and stringLevenshteinDistance(y.name, "${attr.name}")&lt;3 and
                             x --> y
                             report 1 end
                         </query>
                         <feedback>${attr.feedback}</feedback>
                     </rule>`
        })

        return code
    },

    generateGeneralizationRule: function (rule) {
        let code = ""
        if (rule.rule_specific.type === rulesDefinitions.GENERALIZATION_TYPE.implementation) {
            code += "<!-- Implementation rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                         <query>from x : V{Class}, i : V{Interface}
                                with
                                isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_child}")&lt;3 and
                                isDefined(i.name) and stringLevenshteinDistance(i.name, "${rule.rule_specific.class_parent}")&lt;3 and
                                x &lt;--{ClientEdge} V{Realization} --> i 
                                report 1 end
                         </query>
                         <feedback>${rule.feedback}</feedback>
                     </rule>`
        } else {
            code += "<!-- Generalization rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from a,b : V{Class}
                               with
                               isDefined(a.name) and stringLevenshteinDistance(a.name, "${rule.rule_specific.class_child}")&lt;3 and
                               isDefined(b.name) and stringLevenshteinDistance(b.name, "${rule.rule_specific.class_parent}")&lt;3 and
                               a --> V{Generalization} --> b
                               report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                      </rule>`
        }
        return code
    },

    generateCompositionRule: function (rule) {
        const elem_mul = this.getMultiplicity(rule.rule_specific.element_multiplicity)
        let code = "<!-- Composition rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x, y : V{Class}, p: V{Property}, a,b: V{LiteralString}
                        with
                        isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_composite}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_element}")&lt;3 and
                        isDefined(p.aggregation) and p.aggregation="composite" and
                        x --> V{Property} --> V{Association} --> p &lt;-- y and
                        isDefined(a.value) and a.value="${elem_mul.min}"  and
                        isDefined(b.value) and b.value="${elem_mul.max}"  and
                        x --> V{Property} --> a and
                        x --> V{Property} --> b
                        report 1 end
                    </query>
                    <feedback>
                        ${rule.feedback}
                    </feedback>
                </rule>`
        return code;
    },

    generateAggregationRule: function (rule) {
        const elem_mul = this.getMultiplicity(rule.rule_specific.element_multiplicity)
        let code = "<!-- Aggregation rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x, y : V{Class}, p: V{Property}, a,b: V{LiteralString}
                        with
                        isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_aggregate}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_element}")&lt;3 and
                        isDefined(p.aggregation) and p.aggregation="shared" and
                        x --> V{Property} --> V{Association} --> p &lt;-- y and
                        isDefined(a.value) and a.value="${elem_mul.min}"  and
                        isDefined(b.value) and b.value="${elem_mul.max}"  and
                        x --> V{Property} --> a and
                        x --> V{Property} --> b
                        report 1 end
                    </query>
                    <feedback>
                        ${rule.feedback}
                    </feedback>
                </rule>`
        return code;
    },

    generateSimpleAssociationRule: function (rule) {
        const A_mul = this.getMultiplicity(rule.rule_specific.A_multiplicity)
        const B_mul = this.getMultiplicity(rule.rule_specific.B_multiplicity)

        let code = "<!-- Simple Association Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}, ass : V{Association}, a,b,c,d  : V{LiteralString}
                        with
                        isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and
                        isDefined(a.value) and a.value="${B_mul.min}"  and
                        isDefined(b.value) and b.value="${B_mul.max}"  and
                        x --> V{Property} --> a and
                        x --> V{Property} --> b and
                        isDefined(c.value) and c.value="${A_mul.min}"  and
                        isDefined(d.value) and d.value="${A_mul.max}"  and
                        y --> V{Property} --> c and
                        y --> V{Property} --> d and
                        x --> V{Property} --> ass &lt;-- V{Property} &lt;-- y
                        report 1 end
                    </query>
                    <feedback> ${rule.feedback}</feedback>
                 </rule>`
        return code
    },

    generateCountMethodsRule: function (rule) {
        let code = "<!-- Count Methods Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>let c := count(from y : V{Operation}
                        with isDefined(y.name) report y end) in
                        from x : set(1)
                        with
                        c&lt;>${rule.rule_specific.methods}
                        report c as "count" end
                    </query>
                    <feedback>Das Diagramm sollte genau ${rule.rule_specific.methods} Methoden enthalten, enthält aber {count}.</feedback>
                 </rule>`
        return code
    },

    generateCountAttributeRule: function (rule) {
        let code = "<!-- Count Attributes Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                 <query>let c := count(from y : V{Property} 
                    with isDefined(y.name) report y end) in
                    from x : set(1) 
                    with
                    c&lt;>${rule.rule_specific.attributes}
                    report c as "count" end
                 </query>
                 <feedback>Das Diagramm sollte genau ${rule.rule_specific.attributes} Attribute enthalten, enthält aber {count}.</feedback>
                </rule>`
        return code
    },

    generateAssociationClassRule: function (rule) {
        let code = "<!-- Association Class Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y,z : V{Class}
                              with
                              isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                              isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and
                              isDefined(z.name) and stringLevenshteinDistance(z.name, "${rule.rule_specific.class_C}")&lt;3 and
                              z --> V{Property} &lt;-- x and
                              z --> V{Property} &lt;-- y
                              report 1 end
                    </query>
                    <feedback>${rule.feedback}</feedback>
                </rule>`
        return code
    },

    generateTestAssociationRule: function (rule) {
        let feedback
        if (rule.existence === "absence")
            feedback = `Im Diagramm gibt es eine directe Association zwischen die Klasse "${rule.rule_specific.class_B}" und die Klasse "${rule.rule_specific.class_A}". Das kann durch eine bessere Modellierung vermieden werden.`
        else
            feedback = `Im Diagramm  gibt es keine directe Association zwischen die Klasse "${rule.rule_specific.class_B}" und die Klasse "${rule.rule_specific.class_A}". Das kann durch eine bessere Modellierung vermieden werden.`

        let code = "<!-- Test Association Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}
                           with
                           isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                           isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and
                           x --> V{Property} --> V{Association} &lt;-- V{Property} &lt;-- y
                           report 1 end
                    </query>
                    <feedback prefix="Hinweis">${feedback}</feedback>
                  </rule>`
        return code
    },

    generateNominationConsistencyRule: function () {
        let code = "<!-- Nomination Consistency  Rule -->"
        code += `<rule type="absence" points="0">
                 <query>from x,y : V{Property} 
                    with 
                    isDefined(x.name) and isDefined(y.name) and
                    x.name=capitalizeFirst(x.name) and
                    not (y.name=capitalizeFirst(y.name)) 
                    report x.name, y.name end
                </query>
                <feedback>Hinweis (ohne Punktabzug): Ein Diagramm sollte eine konsistente Schreibweise enthalten, in der entweder alle Attribute mit einem Grossbuchstaben oder alle Attribute mit einem Kleinbuchstaben beginnen.</feedback>
                </rule>`
        return code
    },

    getVisibility: function (accessor) {
        switch (accessor.visibility) {
            case 'public':
                return 'y.visibility="public" and '
            case 'private':
                return 'y.visibility="private" and'
            case 'protected':
                return 'y.visibility="protected" and'
            default:
                return ""
        }
    },
    isStatic: function (accessor) {
        if (accessor.is_static)
            return 'y.isStatic=true '
        else
            return 'y.isStatic=false '
    },
    getType: function (type) {
        switch (type.toLowerCase()) {
            case 'int':
                return "Integer"
            case 'string':
                return "String"
            case 'bool':
            case 'boolean':
                return "Boolean"
            default:
                return "!prim"
        }
    },
    getMultiplicity: function (multiplicity) {
        const range = {};

        if (multiplicity === '*') {
            range.min = '*';
            range.max = '*';
        } else if (multiplicity === '+') {
            range.min = '+';
            range.max = '+';
        } else if (/^\d+$/.test(multiplicity)) {
            range.min = multiplicity;
            range.max = multiplicity;
        } else if (/^\d+\.\.\d+$/.test(multiplicity)) {
            const [minStr, maxStr] = multiplicity.split('..');
            range.min = minStr;
            range.max = maxStr;
        } else if (/^\d+\.\.\*+$/.test(multiplicity)) {
            const str = multiplicity.split('..');
            range.min = str[0];
            range.max = '*';
        } else {
            throw new Error('invalid multiplicity format');
        }

        return range;
    },
    extractVariableNames: function (inputString) {
        inputString += ';'
        const variablePattern = /\b(\w+)\s*,?\s*(?=[,;])/g;
        const matches = inputString.match(variablePattern);
        if (matches)
            return  matches.map(match => match.trim());
        return [];
    }
}