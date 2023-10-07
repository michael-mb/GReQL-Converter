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

        //TODO: How to handle interfaces ?
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

        if(rule.rule_specific.methods.length !== 0){
            rule.rule_specific.methods.forEach(method => {
                code += this.generateMethodRule(rule, method)
            })
        }

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
              </rule>
        `

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
    }
}