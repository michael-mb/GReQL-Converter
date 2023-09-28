export default {
    defined_class_rule: "Diese Regel extrahiert die Methoden, Attribute und Besonderheiten aller Klassen / Enums und" +
        " Schnittstellen (Interfaces) aus Ihrem UML-Diagramm und gibt Ihnen die Möglichkeit, diese zu ändern. Anschließend werden" +
        " GReQL-Regeln generiert, die auf Ihrer Konfiguration des generierten Objekts basieren. " +
        "\n\nWICHTIG: Schnittstellen und Enums müssen immer mit <<interface>> <<enum>> annotiert werden.",
    count_attributes_rule: "Diese Regel dient dazu, die genaue Anzahl der Methoden festzulegen, die in einer Klasse" +
        " vorhanden sein sollten. Diese Regel ist nicht obligatorisch und wird daher nicht automatisch generiert.",
    count_methods_rule: "Diese Regel dient dazu, die genaue Anzahl der Attribute festzulegen, die in einer Klasse " +
        "vorhanden sein sollten. Diese Regel ist nicht obligatorisch und wird daher nicht automatisch generiert.",
    generalization_rule: "Diese Regel dient dazu, die verschiedenen Generalisierungsbeziehungen zwischen den " +
        "verschiedenen Klassen und Schnittstellen zu definieren: \n" +
        "Die Implementierung von Schnittstellen und die Vererbung von Klassen.",
    has_generalization_child_rule: "Diese Regel überprüft, ob das Modell eine Klasse enthält, auf die in mindestens einer / N " +
        "Generalisierungen verwiesen wird.",
    simple_association_rule: "Diese Regel dient dazu, die Assoziationen zwischen den verschiedenen Klassen zu " +
        "identifizieren und so die Beziehungen zwischen ihnen zu definieren.",
    aggregation_composition_rule: "Diese Regel definiert die verschiedenen Aggregations- und Kompositionsbeziehungen," +
        " die zwischen verschiedenen Klassen im Diagramm bestehen."
}