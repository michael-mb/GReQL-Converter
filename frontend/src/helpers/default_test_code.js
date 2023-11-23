export default {
    empty_test: {
        code: "@startuml\n" +
            "\n" +
            "ClassA \"1..2\" -- \"+\" ClassB : <combineID=3>\n" +
            "ClassC -- ClassD  : <!class, 10 points for rule, combineID=3>\n" +
            "ClassC \"1\" -- \"1\" ClassE : <combineID=3>\n" +
            "\n" +
            "ClassA o-- \"*\" ClassC : <!class, 10 points for rule, combineID=5>\n" +
            "ClassB *-- \"0..2\" ClassC : <!class, 11 points for rule, combineID=5>\n" +
            "\n" +
            "Animal <|-- Mammal : <!class, 5 points for rule, combineID=1>\n" +
            "Swimmer <|.. Dolphin: <combineID=1>\n" +
            "\n" +
            "Swimmer <|.. Dolphin: <combineID=2>\n" +
            "Flyer <|.. Bat: <!class, 5 points for rule, combineID=2>\n" +
            "\n" +
            "@enduml"
    },
    annotation_test:{
        code: "@startuml\n" +
            "/*\n" +
            " If you don't understand the\n" +
            " annotation system, we recommend that you\n" +
            " first read the documentation 😊.\n" +
            "*/\n" +
            "class A <!class, !attr(0,3), !method(1),\n" +
            "  10 points for rule,\n" +
            "  2 points for methods,\n" +
            "  5 points for attributes> {\n" +
            "  - Windows : Int\n" +
            "  - x : Int\n" +
            "  - y : Int\n" +
            "  + Time : Date\n" +
            "  + double lock(int age, bool status)\n" +
            "  + double unlock()\n" +
            "}\n" +
            "\n" +
            "class B <2 points for rule>{}\n" +
            "\n" +
            "A -- B : <!class, 5 points for rule>\n" +
            "\n" +
            "enum TimeUnit <!class, !attr(*),\n" +
            " 4 points for rule,\n" +
            " 1 point for attributes> <<enum>> {\n" +
            "  DAYS\n" +
            "  HOURS\n" +
            "  MINUTES\n" +
            "}\n" +
            "\n" +
            "A <|-- B : <!class, 5 points for rule>\n" +
            "\n" +
            "@enduml"
    },
    easy_test: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "title Relationships - Class Diagram\n" +
            "\n" +
            "class ClassA {\n" +
            "  - Windows : Int\n" +
            "  + Time : Date\n" +
            "  + double Lock(int age, bool status, double number)\n" +
            "}\n" +
            "class ClassB {}\n" +
            "class ClassC {}\n" +
            "class ClassD {}\n" +
            "\n" +
            "ClassA \"1..2\" -- \"*\" ClassB\n" +
            "ClassA o-- \"*\" ClassC\n" +
            "ClassB <|-- ClassC\n" +
            "ClassC -- ClassD\n" +
            "@enduml"
    },
    class_test: {
        code: "@startuml\n" +
            "skin rose\n" +
            "title Observer\n" +
            "\n" +
            "enum TimeUnit <<enum>> {\n" +
            "  DAYS\n" +
            "  HOURS\n" +
            "  MINUTES\n" +
            "}\n" +
            "\n" +
            "interface Subject <<interface>> {\n" +
            "    + void registerObserver(Observer observer)\n" +
            "    + void removeObserver(Observer observer)\n" +
            "    + void notifyObservers()\n" +
            "}\n" +
            "\n" +
            "interface Observer <<interface>> {\n" +
            "    + void update()\n" +
            "}\n" +
            "\n" +
            "class MyTopic {\n" +
            "    - number: int\n" +
            "    + void registerObserver(Observer observer)\n" +
            "    + void removeObserver(Observer observer)\n" +
            "    + void notifyObservers()\n" +
            "}\n" +
            "\n" +
            "abstract class User {\n" +
            "    - username: string\n" +
            "    - alive: boolean \n" +
            "    + void update()\n" +
            "}\n" +
            "@enduml"
    },
    generalization_test: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Generalization\n" +
            "\n" +
            "class Animal {\n" +
            "  + void makeSound()\n" +
            "}\n" +
            "\n" +
            "class Mammal {\n" +
            "  + int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Bird {\n" +
            "  + int layEggs()\n" +
            "}\n" +
            "\n" +
            "class Dog {\n" +
            "  + void makeSound()\n" +
            "  + int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Cat {\n" +
            "  + void makeSound()\n" +
            "  + int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Parrot {\n" +
            "  + void makeSound()\n" +
            "  + int layEggs()\n" +
            "}\n" +
            "\n" +
            "interface Swimmer <<interface>>{\n" +
            "  + void swim()\n" +
            "}\n" +
            "\n" +
            "interface Flyer <<interface>>{\n" +
            "  + void fly()\n" +
            "}\n" +
            "\n" +
            "class Dolphin {\n" +
            "  + void makeSound()\n" +
            "  + int giveBirth()\n" +
            "  + void swim()\n" +
            "}\n" +
            "\n" +
            "class Bat {\n" +
            "  + void makeSound()\n" +
            "  + int giveBirth()\n" +
            "  + void fly()\n" +
            "}\n" +
            "\n" +
            "class Duck {\n" +
            "  + void makeSound()\n" +
            "  + int layEggs()\n" +
            "  + void swim()\n" +
            "  + void fly()\n" +
            "}\n" +
            "\n" +
            "Animal <|-- Mammal\n" +
            "Animal <|-- Bird\n" +
            "\n" +
            "Mammal <|-- Dog\n" +
            "Mammal <|-- Cat\n" +
            "\n" +
            "Bird <|-- Parrot\n" +
            "\n" +
            "Swimmer <|.. Dolphin\n" +
            "Flyer <|.. Bat\n" +
            "Swimmer <|.. Duck\n" +
            "\n" +
            "\n" +
            "@enduml"
    },
    association_rule_test: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Relationships - Class Diagram\n" +
            "\n" +
            "class ClassA {}\n" +
            "\n" +
            "class ClassB {}\n" +
            "\n" +
            "class ClassC {}\n" +
            "\n" +
            "class ClassD {}\n" +
            "\n" +
            "class ClassE {}\n" +
            "\n" +
            "ClassA \"1..2\" -- \"+\" ClassB : Association\n" +
            "ClassA o-- \"*\" ClassC : Aggregation\n" +
            "ClassB *-- \"0..2\" ClassC : Composition\n" +
            "ClassC -- ClassD  : Association\n" +
            "ClassC \"1\" -- \"1\" ClassE : Association\n" +
            "@enduml"
    },
    association_class_rule_test: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Association - Class Diagram\n" +
            "\n" +
            "class Student {\n" +
            " + name: String\n" +
            "}\n" +
            "\n" +
            "class Enrollment {\n" +
            "  void drop()\n" +
            "  void cancel()\n" +
            "}\n" +
            "\n" +
            "Student \"*\" -- \"+\" Course\n" +
            "(Student, Course) .. Enrollment\n" +
            "\n" +
            "@enduml"
    },
    computer_spiel: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Computerspiel - Class Diagram\n" +
            "\n" +
            "class Spielgebiet <!class, 10 points for rule>{}\n" +
            "\n" +
            "class Spielfigur <!class, 10 points for rule, 1 point for methods, 1 point for attribute> {\n" +
            "  + nickname : String\n" +
            "  + gehen (int x, int y)\n" +
            "  + springen (int x, int z)\n" +
            "  + ansprechen (Spielfigur sf)\n" +
            "}\n" +
            "Spielgebiet *-- \"1..2\" Spielfigur:<!class,  10 points for rule>\n" +
            "Spielfigur \"1\" -- \"1\" Spieler: < !class, 10 points for rule>\n" +
            "\n" +
            "class Spieler < !class, 10 points for rule>{}\n" +
            "Spielgebiet \"*\" -- \"1..4\" Spieler : < !class, 10 points for rule>\n" +
            "\n" +
            "class Position < !class, 10 points for rule, 1 point for attribute>{\n" +
            " + x: int\n" +
            " + y: int\n" +
            " + z: int\n" +
            "}\n" +
            "Spielgebiet \"1\" -- \"100000\" Position : <!class,  10 points for rule>\n" +
            "Position \"1\" -- \"1\" Gebietselement : < !class, 10 points for rule>\n" +
            "\n" +
            "abstract class Gebietselement < !class, 10 points for rule>{}\n" +
            "Spielgebiet o-- \"3..*\" Gebietselement: < !class, 10 points for rule>\n" +
            "\n" +
            "class Gegenstand <!class,  10 points for rule, 1 point for method>{\n" +
            "  + nehmen()\n" +
            "}\n" +
            "Gebietselement <|-- Gegenstand : <!class,  10 points for rule>\n" +
            "\n" +
            "class Gegner<!class,  10 points for rule, 1 point for method> {\n" +
            "  + bekaempfen()\n" +
            "}\n" +
            "Gebietselement <|-- Gegner: < !class, 10 points for rule>\n" +
            "Gegner \"1\" -- \"1\" Spielgebiet: < !class, 10 points for rule>\n" +
            "\n" +
            "class Ziel < 10 points for rule> {}\n" +
            "Spielgebiet \"1\" -- \"1\" Ziel: < !class, 10 points for rule>\n" +
            "Gebietselement <|-- Ziel: < !class, 10 points for rule>\n" +
            "\n" +
            "abstract class Form < 10 points for rule, 1 point for method>{\n" +
            "  + ueberwinden()\n" +
            "}\n" +
            "Gebietselement <|-- Form: < !class, 10 points for rule>\n" +
            "\n" +
            "class AtomareForm < 10 points for rule>{}\n" +
            "Form <|-- AtomareForm: < !class, 10 points for rule>\n" +
            "\n" +
            "class KomplexeForm < !class, 10 points for rule>{}\n" +
            "Form <|-- KomplexeForm : < 10 points for rule>\n" +
            "KomplexeForm  *-- \"*\" Form : <!class,  10 points for rule>\n" +
            "\n" +
            "@enduml"
    },
    bau_project: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Fallstudie Mendelssohn & Sohn Maschinenbau GmbH\n" +
            "\n" +
            "enum Rolle <!class, 5 points for attributes,\n" +
            "10 points for rule> <<enum>> {\n" +
            " LEITER\n" +
            " MITARBEITER\n" +
            "}\n" +
            "\n" +
            "class Kundenauftragsposition <5 points for attributes,\n" +
            " 10 points for rule> {\n" +
            "  + id: int\n" +
            "  + auftragspositionnummer: int\n" +
            "  + anzahl: int\n" +
            "}\n" +
            "\n" +
            "class Artikel <!class,\n" +
            "  5 points for attributes, 10 points for rule>{\n" +
            "  + id: int\n" +
            "  + beschreibung: String\n" +
            "  + lieferand: String\n" +
            "}\n" +
            "Artikel \"0..1\" -- \"*\" Kundenauftragsposition : <!class, 10 points for rule>\n" +
            "\n" +
            "class Erzeugnis < 10 points for rule, 5 points for attributes> {\n" +
            "  + preis: int\n" +
            "  + hersteller: String\n" +
            "}\n" +
            "\n" +
            "Artikel <|-- Erzeugnis : < 10 points for rule>\n" +
            "\n" +
            "class Bauteil <10 points for rule, 1 points for attributes>{\n" +
            "  + hoehe : int\n" +
            "  + breite: int\n" +
            "  + tiefe : int\n" +
            "}\n" +
            "Artikel <|-- Bauteil : < 10 points for rule>\n" +
            "\n" +
            "class Rofstoff < 10 points for rule, 5 points for attributes>{\n" +
            "  + gewicht: int\n" +
            "  + zustand: string\n" +
            "}\n" +
            "Artikel <|-- Rofstoff: < 10 points for rule>\n" +
            "\n" +
            "class Produktionsauftrag < 10 points for rule, 5 points for attributes>{\n" +
            "  + id: int\n" +
            "  + stueckliste: List<Artikel>\n" +
            "}\n" +
            "Produktionsauftrag \"0..1\" -- \"1\" Kundenauftragsposition : < 10 points for rule>\n" +
            "\n" +
            "class Person < 10 points for rule, 5 points for attributes>{\n" +
            "  + id: int\n" +
            "  + rolle: Rolle\n" +
            "  + name: String\n" +
            "  + vorname: String\n" +
            "}\n" +
            "Person \"1\" -- \"*\" Produktionsauftrag : < 10 points for rule>\n" +
            "\n" +
            "class TechnischeSpezifikation <!class, !attr(*), 10 points for rule, 5 points for attributes>{\n" +
            "  + id: int\n" +
            "  + schaltungstyp: String\n" +
            "  + eingangwiderstand: String\n" +
            "  + phasenverschiebung: String\n" +
            "}\n" +
            "\n" +
            "class Kundenauftrag <10 points for rule, 5 points for attributes>{\n" +
            "  + id: int\n" +
            "  + status: String\n" +
            "  + abwicklungsdatum: String\n" +
            "}\n" +
            "Kundenauftrag *-- \"*\" Kundenauftragsposition : < 10 points for rule>\n" +
            "Kundenauftrag *-- \"*\" TechnischeSpezifikation : < 10 points for rule>\n" +
            "\n" +
            "class Kunden <10 points for rule, 5 points for attributes>{\n" +
            "  + kundennummer: int\n" +
            "  + name: String \n" +
            "  + anschrift: String\n" +
            "}\n" +
            "Kunden \"1\" -- \"*\" Kundenauftrag : < 10 points for rule>\n" +
            "\n" +
            "@enduml"
    }
}