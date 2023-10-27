export default {
    annotation_test:{
        code: "@startuml\n" +
            "/*\n" +
            " If you don't understand the\n" +
            " annotation system, we recommend that you\n" +
            " first read the documentation 😊.\n" +
            "*/\n" +
            "class A <!class, !attr(0,3), !method(1,2), p=10, ad-p=3, md-p=5> {\n" +
            "  - Windows : Int\n" +
            "  - x : Int\n" +
            "  - y : Int\n" +
            "  + Time : Date\n" +
            "  + double lock(int age, bool status)\n" +
            "  + double unlock()\n" +
            "}\n" +
            "\n" +
            "class B {}\n" +
            "\n" +
            "A -- B : <!class, p=5>\n" +
            "\n" +
            "enum TimeUnit <!class, !attr(*), p=5, ad-p=2> <<enum>> {\n" +
            "  DAYS\n" +
            "  HOURS\n" +
            "  MINUTES\n" +
            "}\n" +
            "\n" +
            "A <|-- B : <!class, p=10>\n" +
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
            "class Spielgebiet{}\n" +
            "\n" +
            "class Spielfigur {\n" +
            "  + nickname : String\n" +
            "  + gehen (int x, int y)\n" +
            "  + springen (int x, int z)\n" +
            "  + ansprechen (Spielfigur sf)\n" +
            "}\n" +
            "Spielgebiet *-- \"1..2\" Spielfigur\n" +
            "Spielfigur \"1\" -- \"1\" Spieler\n" +
            "\n" +
            "class Spieler {}\n" +
            "Spielgebiet \"*\" -- \"1..4\" Spieler\n" +
            "\n" +
            "class Position{\n" +
            " + x: int\n" +
            " + y: int\n" +
            " + z: int\n" +
            "}\n" +
            "Spielgebiet \"1\" -- \"100000\" Position\n" +
            "Position \"1\" -- \"1\" Gebietselement\n" +
            "\n" +
            "abstract class Gebietselement{}\n" +
            "Spielgebiet o-- \"3..*\" Gebietselement\n" +
            "\n" +
            "class Gegenstand {\n" +
            "  + nehmen()\n" +
            "}\n" +
            "Gebietselement <|-- Gegenstand\n" +
            "\n" +
            "class Gegner {\n" +
            "  + bekaempfen()\n" +
            "}\n" +
            "Gebietselement <|-- Gegner\n" +
            "Gegner \"1\" -- \"1\" Spielgebiet\n" +
            "\n" +
            "class Ziel {}\n" +
            "Spielgebiet \"1\" -- \"1\" Ziel\n" +
            "Gebietselement <|-- Ziel\n" +
            "\n" +
            "abstract class Form {\n" +
            "  + ueberwinden()\n" +
            "}\n" +
            "Gebietselement <|-- Form\n" +
            "\n" +
            "class AtomareForm{}\n" +
            "Form <|-- AtomareForm\n" +
            "\n" +
            "class KomplexeForm{}\n" +
            "Form <|-- KomplexeForm\n" +
            "KomplexeForm  *-- \"*\" Form\n" +
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
            "enum Rolle <<enum>> {\n" +
            " LEITER\n" +
            " MITARBEITER\n" +
            "}\n" +
            "\n" +
            "class Kundenauftragsposition {\n" +
            "  + id: int\n" +
            "  + auftragspositionnummer: int\n" +
            "  + anzahl: int\n" +
            "}\n" +
            "\n" +
            "class Artikel {\n" +
            "  + id: int\n" +
            "  + beschreibung: String\n" +
            "  + lieferand: String\n" +
            "}\n" +
            "Artikel \"0..1\" -- \"*\" Kundenauftragsposition\n" +
            "\n" +
            "class Erzeugnis {\n" +
            "  + preis: int\n" +
            "  + hersteller: String\n" +
            "}\n" +
            "Artikel <|-- Erzeugnis\n" +
            "\n" +
            "class Bauteil {\n" +
            "  + hoehe : int\n" +
            "  + breite: int\n" +
            "  + tiefe : int\n" +
            "}\n" +
            "Artikel <|-- Bauteil\n" +
            "\n" +
            "class Rofstoff {\n" +
            "  + gewicht: int\n" +
            "  + zustand: string\n" +
            "}\n" +
            "Artikel <|-- Rofstoff\n" +
            "\n" +
            "class Produktionsauftrag{\n" +
            "  + id: int\n" +
            "  + stueckliste: List<Artikel>\n" +
            "}\n" +
            "Produktionsauftrag \"0..1\" -- \"1\" Kundenauftragsposition\n" +
            "\n" +
            "class Person{\n" +
            "  + id: int\n" +
            "  + rolle: Rolle\n" +
            "  + name: String\n" +
            "  + vorname: String\n" +
            "}\n" +
            "Person \"1\" -- \"*\" Produktionsauftrag\n" +
            "\n" +
            "class TechnischeSpezifikation{\n" +
            "  + id: int\n" +
            "  + schaltungstyp: String\n" +
            "  + eingangwiderstand: String\n" +
            "  + phasenverschiebung: String\n" +
            "}\n" +
            "\n" +
            "class Kundenauftrag {\n" +
            "  + id: int\n" +
            "  + status: String\n" +
            "  + abwicklungsdatum: String\n" +
            "}\n" +
            "Kundenauftrag *-- \"*\" Kundenauftragsposition\n" +
            "Kundenauftrag *-- \"*\" TechnischeSpezifikation\n" +
            "\n" +
            "class Kunden {\n" +
            "  + kundennummer: int\n" +
            "  + name: String \n" +
            "  + anschrift: String\n" +
            "}\n" +
            "Kunden \"1\" -- \"*\" Kundenauftrag\n" +
            "\n" +
            "@enduml"
    }
}