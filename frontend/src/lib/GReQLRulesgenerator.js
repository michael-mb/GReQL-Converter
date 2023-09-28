export default {
    generateGReQLRules: function (rules){
        return ` <rule type="presence" points="2">
   <query>from m : V{MethodDeclaration}, s : V{StringLiteral}
          with
             m.name="m" and
             m -->{Child}* s and
             s.content = "\\"Zeichenkette\\""
          report 0 end
   </query>
   <feedback>Deine Lösung verwendet nicht den String "Zeichenkette".</feedback>
 </rule>`
    },
}