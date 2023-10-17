import rulesDefinitions from "@/lib/rulesDefinitions";

export default {
    generateGReQLRules: function (rules){
        console.log("rules:", rules)
        let code = ""
        rules.forEach(rule => {
            switch (rule.rule_type){
                case 'defined_class_rule':
                    code += this.generateDefineClassRule(rule)
                    break
                case 'generalization_rule':
                    code += this.generateGeneralizationRule(rule)
                    break
                case 'composition_rule':
                    code += this.generateCompositionRule(rule)
                    break
                case 'test_association_rule':
                    code += this.generateTestAssociationRule(rule)
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
                    // TODO: How to handle Enums ?
                    console.log(rule.rule_type + " - Not supported 😢");
            }
        })

        return "<checkerrules>" + code + "</checkerrules>"
    },

    generateDefineClassRule: function (rule) {
        const isInterface = rule.rule_specific.interface
        let code = ""
        if(isInterface){
            code += "<!-- Interface Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                        <query>from x : V{Interface} with isDefined(x.name) and  
                               stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 
                               report 1 end
                        </query>
                        <feedback>${rule.feedback}</feedback>
                    </rule>`
        } else {
            const isAbstract = rule.rule_specific.abstract

            let abstractCode
            if(isAbstract)
                abstractCode = `and x.isAbstract`
            else
                abstractCode = `and (not x.isAbstract)`
            code += "<!-- Class Definition -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x : V{Class} with isDefined(x.name) and  
                           stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 
                           ${abstractCode}
                           report 1 end
                    </query>
                    <feedback>${rule.feedback}</feedback>
                    </rule>`
        }

        /*
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
         */

        return code
    },
    generateAttributeRule: function (rule, attribute){
        /***
        TODO: To be done
        1- Only 3 primitive type are working  Integer - Boolean - String
        2- How to handle Double , other classes ?
        */

        let code = ""
        let visibility = this.getVisibility(attribute)
        let isStatic = this.isStatic(attribute)
        let primitiveType = this.getType(attribute.type)

        let vType = "from x : V{Class}, y : V{Property}, z : V{PrimitiveType}"
        let vTypeText = `isDefined(z.name) and z.name="${primitiveType}"`
        if(primitiveType === '!prim'){
            code += "<!-- TODO: Inability to write rules for attributes with non-primitive types ... -->"
            vType = "from x,z : V{Class}, y : V{Property}"
            vTypeText = `isDefined(z.name) and z.name="${attribute.type}"`
        }

        code += `<rule type="presence" points="${attribute.points}">
                <query> ${vType}
                       with
                          isDefined(x.name) and stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 and 
                          x --> y and isDefined(y.name) and stringLevenshteinDistance(y.name, "${attribute.name}")&lt;3 and
                          ${visibility}
                          ${isStatic}
                          y --> z and
                          ${vTypeText}
                       report 1 end
                </query>
                <feedback>${attribute.feedback}</feedback>
              </rule>`

        return code
    },
    generateMethodRule: function (rule,method){
        console.log("Method:", method)

        let code = ""
        let visibility = this.getVisibility(method)
        let isStatic = this.isStatic(method)
        let retType = this.getType(method.return_type)

        /***
         TODO: To be done
         1- Only 3 primitive type are working  Integer - Boolean - String
         2- How do you write a query that checks the type returned?
         3- How do you write a request that checks the arguments of a method?
         */
        code += "<!-- TODO: Only 3 primitive type are working  Integer - Boolean - String -->"
        code += "<!-- TODO: How do you write a query that checks the type returned? -->"
        code += "<!-- TODO: How do you write a request that checks the arguments of a method? -->"
        code += `<rule type="presence" points="${method.points}">
                <query>from x : V{Class}, y : V{Operation}, ret: V{Parameter}, retType: V{PrimitiveType}
                       with
                          isDefined(x.name) and x.name="${rule.rule_specific.class_name}" and
                          x --> y and
                          ${visibility}
                          ${isStatic}
                          isDefined(y.name) and stringLevenshteinDistance(y.name, "${method.name}")&lt;3 and
                          y --> ret and isDefined(ret.name) and ret.name="return" and 
                          ret --> retType and isDefined(retType.name) and retType.name="${retType}"
                       report 1 end
                </query>
                <feedback>${method.feedback}</feedback>
              </rule>`
        return code
    },

    generateGeneralizationRule: function (rule) {
        let code = ""
        if(rule.rule_specific.type === rulesDefinitions.GENERALIZATION_TYPE.implementation){
            code += "<!-- Implementation rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
                     <query>from x : V{Class}, i : V{Interface} with
                     isDefined(x.name) and x.name="${rule.rule_specific.class_child}" and
                     isDefined(i.name) and i.name="${rule.rule_specific.class_parent}" and
                     x &lt;--{ClientEdge} V{Realization} --> i 
                     report 1 end</query>
                     <feedback>${rule.feedback}</feedback>
                     </rule>`
        } else {
            code += "<!-- Generalization rule -->"
            code += `<rule type="${rule.existence}" points="${rule.points}">
            <query>from a,b : V{Class}
                   with
                      isDefined(a.name) and a.name="${rule.rule_specific.class_child}" and
                      isDefined(b.name) and b.name="${rule.rule_specific.class_parent}" and
                      a --> V{Generalization} --> b
                   report 1 end
            </query>
            <feedback>${rule.feedback}</feedback>
          </rule>`
        }
        return code
    },

    generateCompositionRule: function (rule) {
        console.log("Composition Rule:", rule)

        let code = "<!-- Composition rule -->"
        code += "<!-- TODO: How to do it ? -->"
        code += `  <rule type="${rule.existence}" points="${rule.points}">
                    <query>from a,b : V{Class}, p: V{Property}
                           with
                              isDefined(a.name) and a.name="${rule.rule_specific.class_composite}" and
                              isDefined(b.name) and b.name="${rule.rule_specific.class_element}" and
                              b --> p and
                              isDefined(p.aggregation) and p.aggregation="composite"
                           report 1 end
                    </query>
                    <feedback>${rule.feedback}</feedback>
                  </rule>`
        return code;
    },

    generateSimpleAssociationRule: function (rule) {
        console.log("Simple ASS Rule: ", rule)
        /**
         * TODO: Not working 😢
         */
        let code = "<!-- Simple Association Rule -->"
        code += "<!-- TODO: How to do it ? With cardinality ??? -->"
        code += `  <rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}, a: V{Property}
                           with
                              isDefined(x.name) and x.name="${rule.rule_specific.class_A}" and
                              isDefined(y.name) and y.name="${rule.rule_specific.class_B}" and
                              isDefined(a.lower) and a.lower="1" and 
                              (not isDefined(a.upper) or a.upper="1") and
                              x --> a and
                              a --> V{Association} &lt;-- V{Property} &lt;-- y
                           report 1 end
                    </query>
                    <feedback>Das Diagramm enthält keine Beziehung zwischen einem "A" und einem "B" mit der Kardinalität 1 oder keine Klassen mit diesen Namen.</feedback>
                  </rule>`
        return code
    },

    generateCountMethodsRule: function (rule){
        let code = "<!-- Count Methods Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>let c := count(from y : V{Operation} with isDefined(y.name) report y end) in
                              from x : set(1)
                              with
                                 c&lt;>${rule.rule_specific.methods}
                              report c as "count" end
                    </query>
                    <feedback>Das Diagramm sollte genau ${rule.rule_specific.methods} Methoden enthalten, enthält aber {count}.</feedback>
              </rule>`
        return code
    },

    generateCountAttributeRule: function (rule){
        let code = "<!-- Count Attributes Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                <query>let c := count(from y : V{Property} with isDefined(y.name) report y end) in
                           from x : set(1) 
                           with c&lt;>${rule.rule_specific.attributes}
                           report c as "count" end</query>
                <feedback>Das Diagramm sollte genau ${rule.rule_specific.attributes} Attribute enthalten, enthält aber {count}.</feedback>
                </rule>`
        return code
    },

    generateTestAssociationRule: function (rule) {
        let feedback
        if(rule.existence === "absence")
            feedback = `Im Diagramm gibt es eine directe Association zwischen die Klasse "${rule.rule_specific.class_B}" und die Klasse "${rule.rule_specific.class_A}". Das kann durch eine bessere Modellierung vermieden werden.`
        else
            feedback = `Im Diagramm  gibt es keine directe Association zwischen die Klasse "${rule.rule_specific.class_B}" und die Klasse "${rule.rule_specific.class_A}". Das kann durch eine bessere Modellierung vermieden werden.`

        let code = "<!-- Test Association Rule -->"
        code += `<rule type="${rule.existence}" points="${rule.points}">
                    <query>from x,y : V{Class}
                           with
                              isDefined(x.name) and x.name="${rule.rule_specific.class_A}" and
                              isDefined(y.name) and y.name="${rule.rule_specific.class_B}" and
                              x --> V{Property} --> V{Association} &lt;-- V{Property} &lt;-- y
                           report 1 end
                    </query>
                    <feedback prefix="Hinweis">${feedback}</feedback>
                  </rule>`
        return code
    },

    generateNominationConsistencyRule: function (){
        let code = "<!-- Nomination Consistency  Rule -->"
        code +=`<rule type="absence" points="0">
                <query>from x,y : V{Property} 
                with 
                    isDefined(x.name) and isDefined(y.name) and
                    x.name=capitalizeFirst(x.name) and
                    not (y.name=capitalizeFirst(y.name)) 
                    report x.name, y.name end</query>
                <feedback>Hinweis (ohne Punktabzug): Ein Diagramm sollte eine konsistente Schreibweise enthalten, in der entweder alle Attribute mit einem Grossbuchstaben oder alle Attribute mit einem Kleinbuchstaben beginnen.</feedback>
                </rule>`
        return code
    },

    getVisibility: function (accessor) {
        switch (accessor.visibility){
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
        if(accessor.is_static)
            return 'y.isStatic=true and'
        else
            return 'y.isStatic=false and'
    },
    getType: function(type){
        switch (type.toLowerCase()) {
            // TODO: All primary Type
            case 'int':
                return "Integer"
            case 'double':
                return "Double"
            case 'string':
                return "String"
            case 'float':
                return  "Float"
            case 'bool': case 'boolean':
                return "Boolean"
            case 'void':
                return "void"
            default:
                return "!prim"
        }
    },
    getMultiplicity: function(multiplicity){
        const range = {};

        if (multiplicity === '*') {
            range.min = 0;
            range.max = -1;
        } else if (multiplicity === '+') {
            range.min = 1;
            range.max = -1;
        } else if (/^\d+$/.test(multiplicity)) {
            const n = parseInt(multiplicity, 10);
            range.min = n;
            range.max = n;
        } else if (/^\d+\.\.\d+$/.test(multiplicity)) {
            const [minStr, maxStr] = multiplicity.split('..');
            range.min = parseInt(minStr, 10);
            range.max = parseInt(maxStr, 10);
        } else if (/^\d+\.\.\*+$/.test(multiplicity)){
            const [minStr, maxStr] = multiplicity.split('..');
            range.min = parseInt(minStr, 10);
            range.max = -1;
        }
        else {
            throw new Error('invalid multiplicity format');
        }

        return range;
    },

}