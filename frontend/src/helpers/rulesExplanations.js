export default {
    defined_class_rule: "Diese Regel extrahiert die Methoden, Attribute und Besonderheiten aller Klassen / Enums und" +
        " Schnittstellen (Interfaces) aus Ihrem UML-Diagramm und gibt Ihnen die Möglichkeit, diese zu ändern. Anschließend werden" +
        " GReQL-Regeln generiert, die auf Ihrer Konfiguration des generierten Objekts basieren. " +
        "\n\nWICHTIG: Schnittstellen und Enums müssen immer mit <<interface>> <<enum>> annotiert werden.",
    count_methods_rule: "Diese Regel dient dazu, die genaue Anzahl der Methoden festzulegen, die in einem Diagramm " +
        "vorhanden sein sollten. Diese Regel ist nicht obligatorisch und wird daher nicht automatisch generiert.",
    count_attributes_rule: "Diese Regel dient dazu, die genaue Anzahl der Attribute festzulegen, die in einem Diagramm " +
        "vorhanden sein sollten. Diese Regel ist nicht obligatorisch und wird daher nicht automatisch generiert.",
    generalization_rule: "Diese Regel dient dazu, die verschiedenen Generalisierungsbeziehungen zwischen den " +
        "verschiedenen Klassen und Schnittstellen zu definieren: \n" +
        "Die Implementierung von Schnittstellen und die Vererbung von Klassen.",
    has_generalization_child_rule: "Diese Regel überprüft, ob das Modell eine Klasse enthält, auf die in mindestens einer / N " +
        "Generalisierungen verwiesen wird.",
    simple_association_rule: "Diese Regel dient dazu, die Assoziationen zwischen den verschiedenen Klassen zu " +
        "identifizieren und so die Beziehungen zwischen ihnen zu definieren.",
    aggregation_composition_rule: "Diese Regel definiert die verschiedenen Aggregations- und Kompositionsbeziehungen," +
        " die zwischen verschiedenen Klassen im Diagramm bestehen.",
    test_association_rule: "Diese Regel dient einfach dazu, festzustellen, ob es eine Assoziation zwischen zwei Klassen" +
        " gibt, unabhängig von der Art der Assoziation (Aggregation, Komposition oder sogar einfache Assoziation).",
    association_class_rule: "Diese Regel untersucht die Existenz einer Assoziationsklasse auf einer Beziehung" +
        " zwischen zwei Klassen.",
    nomination_consistency: "Ein Diagramm sollte eine konsistente Schreibweise enthalten, in der entweder alle Attribute" +
        " mit einem Großbuchstaben oder alle Attribute mit einem Kleinbuchstaben beginnen.",
    combined_rule: "Diese Regel bietet die Möglichkeit, die möglichen korrekten Alternativen in einem Klassendiagramm zu verwalten. "
}