export default {
    generateGReQLRules: function (rules){
        console.log("rules:", rules)
        let code = ""
        rules.forEach(rule => {
            switch (rule.rule_type){
                case 'defined_class_rule':
                    code += this.generateDefineClassRule(rule)
                    break;
                default:
                    console.log("Not supported 😢");
            }
        })

        return "<checkerrules>" + code + "</checkerrules>"
    },

    generateDefineClassRule: function (rule) {
        const isAbstract = rule.rule_specific.abstract
        const isInterface = rule.rule_specific.interface

        let abstractCode
        if(isAbstract)
            abstractCode = `and x.isAbstract`
        else
            abstractCode = `and (not x.isAbstract)`

        let code = `<rule type="${rule.existence}" points="${rule.points}">
        <query>from x : V{Class} with isDefined(x.name) and  
               stringLevenshteinDistance(x.name, "${rule.rule_specific.class_name}")&lt;3 
               ${abstractCode}
               report 1 end
        </query>
        <feedback>${rule.feedback}</feedback>
        </rule>
         `

        if(rule.rule_specific.attributes.length !== 0){
            rule.rule_specific.attributes.forEach(attribute => {
                code += this.generateAttributeRule(rule, attribute)
            })
        }


        return code
    },

    generateAttributeRule: function (rule, attribute){
        let code = ""
        let visibility = ""
        switch (attribute.visibility){
            case 'public':
                visibility += 'y.visibility ="public" and '
                break
            case 'private':
                visibility += 'y.visibility ="private" and'
                break
            case 'protected':
                visibility += 'y.visibility ="protected" and'
                break
        }

        let isStatic
        if(attribute.is_static)
            isStatic = 'y.isStatic =true and'
        else
            isStatic = 'y.isStatic =false and'

        let primitiveType
        switch (attribute.type.toLowerCase()) {
            // TODO: All primary Type
            case 'int':
                primitiveType = "Integer"
                break
            case 'double':
                primitiveType = "Double"
                break
            case 'string':
                primitiveType = "String"
                break
            case 'float':
                primitiveType = "Float"
                break
            case 'bool': case 'boolean':
                primitiveType = "Boolean"
                break
            default:
                primitiveType = "!prim"
        }

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
    }

}