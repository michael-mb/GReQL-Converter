import rulesDefinitions from "@/lib/rulesDefinitions";

export default {
    ruleTypeToGenerator : {
        'defined_class_rule': 'generateDefineClassRule',
        'defined_enum_rule': 'generateEnumRule',
        'generalization_rule': 'generateGeneralizationRule',
        'composition_rule': 'generateCompositionRule',
        'aggregation_rule': 'generateAggregationRule',
        'test_association_rule': 'generateTestAssociationRule',
        'association_class_rule': 'generateAssociationClassRule',
        'count_methods_rule': 'generateCountMethodsRule',
        'count_attributes_rule': 'generateCountAttributeRule',
        'simple_association_rule': 'generateSimpleAssociationRule',
        'nomination_consistency_rule': 'generateNominationConsistencyRule',
        'combined_rule': 'generateCombineRule'
    },

    generateGReQLRule: function(rule){
        if(rule === undefined)
            return ""

        const generator = this.ruleTypeToGenerator[rule.rule_type];
        let code = "";

        if (generator && typeof this[generator] === 'function') {
            code += this[generator](rule);
        } else {
            code += `<!-- ${rule.rule_type} - Not supported 😢 -->`;
            console.log(rule.rule_type + " - Not supported 😢");
        }

        return "<checkerrules>" + code + "</checkerrules>";
    },
    generateGReQLRules: function (rules) {
        let code = "";

        rules.forEach((rule) => {
            if (!rule.active) return;

            const generator = this.ruleTypeToGenerator[rule.rule_type];
            if (generator && typeof this[generator] === 'function') {
                code += this[generator](rule);
            } else {
                code += `<!-- ${rule.rule_type} - Not supported 😢 -->`;
                console.log(rule.rule_type + " - Not supported 😢");
            }
        });

        return "<checkerrules>" + code + "</checkerrules>";
    },

    generateDefineClassRule: function (rule) {
        const isInterface = rule.rule_specific.interface
        let code = ""
        let checkName
        if(rule.rule_specific.exact_match)
            checkName = `x.name="${rule.rule_specific.class_name}"`
        else
            checkName = `stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3`

        if (isInterface) {
            code += "<!-- Interface Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from x : V{Interface} 
                               with 
                               isDefined(x.name) and 
                               ${checkName} 
                              report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                     </rule>`
        } else {
            const isAbstract = rule.rule_specific.abstract

            let abstractCode
            if (isAbstract)
                abstractCode = `and isDefined(x.isAbstract) and x.isAbstract`
            else
                abstractCode = `and isDefined(x.isAbstract) and (not x.isAbstract)`

            code += "<!-- Class Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from x : V{Class} 
                               with
                               isDefined(x.name) and  
                               ${checkName}
                               ${abstractCode}
                               report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                    </rule>`
        }

        if(rule.rule_specific.attributes.length !== 0){
            rule.rule_specific.attributes.forEach(attribute => {
                if(!attribute.active)
                    return
                code += this.generateAttributeRule(rule, attribute)
            })
        }

        if(rule.rule_specific.methods.length !== 0){
            rule.rule_specific.methods.forEach(method => {
                if(!method.active)
                    return
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

        let checkName
        if(attribute.exact_match)
            checkName = `y.name="${attribute.name}"`
        else
            checkName = `stringLevenshteinDistance(y.name, "${attribute.name}")&lt;3`

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
                           x --> y and isDefined(y.name) and
                           ${checkName} and
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
        let checkName
        if(method.exact_match)
            checkName = `y.name="${method.name}"`
        else
            checkName = `stringLevenshteinDistance(y.name, "${method.name}")&lt;3`

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
                           isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 and
                           isDefined(y.name) and
                           ${checkName} and
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
        let checkName
        if(rule.rule_specific.exact_match)
            checkName = `x.name="${rule.rule_specific.enum_class_name}"`
        else
            checkName = `stringLevenshteinDistance(x.name, "${rule.rule_specific.enum_class_name}")&lt;3`

        code += "<!-- Enum Definition-->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x : V{Enumeration}
                        with
                        isDefined(x.name) and
                        ${checkName}
                        report 1 end
                    </query>
                    <feedback>${rule.feedback}</feedback>
                 </rule>`
        rule.rule_specific.attributes.forEach(attr => {
            if(!attr.active)
                return
            let checkAttrName
            if(attr.exact_match)
                checkAttrName = `y.name="${attr.name}"`
            else
                checkAttrName = `stringLevenshteinDistance(y.name, "${attr.name}")&lt;3`
            code += "<!-- Enum Attribute Definition-->"
            code += `<rule type="presence" points="${attr.points}">
                         <query>
                             from x : V{Enumeration}, y: V{EnumerationLiteral}
                             with
                             isDefined(x.name) and ${checkName} and
                             isDefined(y.name) and ${checkAttrName} and
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
            let checkName
            if(rule.rule_specific.exact_match){
                checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_child}" and
                                isDefined(i.name) and i.name="${rule.rule_specific.class_parent}" and`
            }
            else{
                checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_child}")&lt;3 and
                                isDefined(i.name) and stringLevenshteinDistance(i.name, "${rule.rule_specific.class_parent}")&lt;3 and`
            }

            code += "<!-- Implementation rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                         <query>from x : V{Class}, i : V{Interface}
                                with
                                ${checkName}
                                x &lt;--{ClientEdge} V{Realization} --> i 
                                report 1 end
                         </query>
                         <feedback>${rule.feedback}</feedback>
                     </rule>`
        } else {
            let checkName
            if(rule.rule_specific.exact_match){
                checkName = `isDefined(a.name) and a.name="${rule.rule_specific.class_child}" and
                               isDefined(b.name) and b.name="${rule.rule_specific.class_parent}" and`
            }
            else{
                checkName = `isDefined(a.name) and stringLevenshteinDistance(a.name, "${rule.rule_specific.class_child}")&lt;3 and
                               isDefined(b.name) and stringLevenshteinDistance(b.name, "${rule.rule_specific.class_parent}")&lt;3 and`
            }
            code += "<!-- Generalization rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from a,b : V{Class}
                               with
                               ${checkName}
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
        let checkName
        if(rule.rule_specific.exact_match){
            checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_composite}" and
                        isDefined(y.name) and y.name="${rule.rule_specific.class_element}" and`
        }
        else{
            checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_composite}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_element}")&lt;3 and`
        }
        let code = "<!-- Composition rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x, y : V{Class}, p: V{Property}, a,b: V{LiteralString}
                        with
                        ${checkName}
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
        let checkName
        if(rule.rule_specific.exact_match){
            checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_aggregate}" and
                        isDefined(y.name) and y.name="${rule.rule_specific.class_element}" and`
        }
        else{
            checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_aggregate}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_element}")&lt;3 and`
        }
        let code = "<!-- Aggregation rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>
                        from x, y : V{Class}, p: V{Property}, a,b: V{LiteralString}
                        with
                        ${checkName}
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

        let checkName
        if(rule.rule_specific.exact_match){
            checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_A}" and
                        isDefined(y.name) and y.name="${rule.rule_specific.class_B}" and`
        }
        else{
            checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                        isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and`
        }

        let code = "<!-- Simple Association Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}, ass : V{Association}, a,b,c,d  : V{LiteralString}
                        with
                        ${checkName}
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
        let checkName
        if(rule.rule_specific.exact_match){
            checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_A}" and
                              isDefined(y.name) and y.name="${rule.rule_specific.class_B}" and
                              isDefined(z.name) and z.name="${rule.rule_specific.class_C}" and`
        }
        else{
            checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                              isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and
                              isDefined(z.name) and stringLevenshteinDistance(z.name, "${rule.rule_specific.class_C}")&lt;3 and`
        }
        let code = "<!-- Association Class Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y,z : V{Class}
                              with
                              ${checkName}
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

        let checkName
        if(rule.rule_specific.exact_match){
            checkName = `isDefined(x.name) and x.name="${rule.rule_specific.class_A}" and
                           isDefined(y.name) and y.name="${rule.rule_specific.class_B}" and`
        }
        else{
            checkName = `isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_A}")&lt;3 and
                           isDefined(y.name) and stringLevenshteinDistance(y.name, "${rule.rule_specific.class_B}")&lt;3 and`
        }
        let code = "<!-- Test Association Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}
                           with
                           ${checkName}
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

    generateCombineRule: function (rule){
        let code = "<!-- Combined  Rule -->"
        let queries = ""
        rule.rules.forEach(subRule => {
            if(!subRule.active)
                return
            if(subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.DEFINE_CLASS){
                queries += "<!-- Class Definition SubRule -->"

                const isInterface = subRule.interface
                let checkName
                if(subRule.exact_match)
                    checkName = `x.name="${subRule.name}"`
                else
                    checkName = `stringLevenshteinDistance(x.name, "${subRule.name}")&lt;3`

                if (isInterface) {
                    queries += `<query>from x : V{Interface} 
                    with 
                    isDefined(x.name) and 
                    ${checkName} 
                    report 1 end
                    </query>`
                } else {
                    const isAbstract = subRule.abstract

                    let abstractCode
                    if (isAbstract)
                        abstractCode = `and isDefined(x.isAbstract) and x.isAbstract`
                    else
                        abstractCode = `and isDefined(x.isAbstract) and (not x.isAbstract)`

                    queries += `<query>from x : V{Class} 
                    with
                    isDefined(x.name) and  
                    ${checkName}
                    ${abstractCode}
                    report 1 end
                    </query>`
                }
            }
            else if(subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.METHOD){
                queries += "<!-- Method SubRule -->"
                const visibility = this.getVisibility(subRule)
                const isStatic = this.isStatic(subRule)
                const retType = this.getType(subRule.return_type)
                let checkName
                if(subRule.exact_match)
                    checkName = `y.name="${subRule.name}"`
                else
                    checkName = `stringLevenshteinDistance(y.name, "${subRule.name}")&lt;3`

                let vType = "from x: V{Class}, y : V{Operation}"
                let vTypeText = ""
                if (retType !== '!prim') {
                    vType = "from x : V{Class}, y : V{Operation}, ret: V{Parameter}, retType: V{PrimitiveType}"
                    vTypeText = ` and y --> ret and isDefined(ret.name) and ret.name="return"  and ret --> retType and isDefined(retType.name) and retType.name="${retType}"`
                }

                queries += `<query>${vType}
                with
                isDefined(x.name) and stringLevenshteinDistance(x.name, "${subRule.class}")&lt;3 and
                isDefined(y.name) and
                ${checkName} and
                ${visibility}
                ${isStatic} and
                x --> y 
                ${vTypeText}
                report 1 end
                </query>`
            }
            else if(subRule.rule_type === rulesDefinitions.COMBINED_RULE_DEFINITION.ATTRIBUTE){
                queries += "<!-- Attribute SubRule -->"

                const visibility = this.getVisibility(subRule)
                const isStatic = this.isStatic(subRule)
                const primitiveType = this.getType(subRule.type)

                let checkName
                if(subRule.exact_match)
                    checkName = `y.name="${subRule.name}"`
                else
                    checkName = `stringLevenshteinDistance(y.name, "${subRule.name}")&lt;3`

                let vType = "from x: V{Class}, y : V{Property}"
                let vTypeText = ""
                if (primitiveType !== '!prim') {
                    vType = "from x : V{Class}, y : V{Property}, z : V{PrimitiveType}"
                    vTypeText = `and y --> z and isDefined(z.name) and z.name="${primitiveType}"`
                }

                queries += `<query>${vType}
                with
                isDefined(x.name) and stringLevenshteinDistance(x.name, "${subRule.class}")&lt;3 and 
                x --> y and isDefined(y.name) and
                ${checkName} and
                ${visibility}
                ${isStatic}
                ${vTypeText}
                report 1 end
                </query>`
            }
            else
                queries += "<!-- i don't know this one 😢-->"
        })

        code += `<rule type="${rule.existence}" points="${rule.points}">
                   ${queries}                  
                   <feedback>${rule.feedback}</feedback>
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

        if (multiplicity === '*' || multiplicity === "0..*") {
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