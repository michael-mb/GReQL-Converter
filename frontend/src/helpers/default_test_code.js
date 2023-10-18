export default {
    easy_test: {
        code: "@startuml\n" +
            "class Dwelling {\n" +
            "  + Windows : String\n" +
            "  + Time : Date\n" +
            "  + number: double\n" +
            "  + double Lock(int age, bool status, double number)\n" +
            "}\n" +
            "@enduml"
    },
    easy_method_test: {
        code: "@startuml\n" +
            "class Dwelling {\n" +
            " +void Lock()\n" +
            "}\n" +
            "@enduml"
    },
    easy_test_improved: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "title Relationships - Class Diagram\n" +
            "\n" +
            "class ClassA {\n" +
            "  - Windows : Int\n" +
            "  + Time : Date\n" +
            "  +void Lock()\n" +
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
            "    + void registerObserver(observer: Observer)\n" +
            "    + void removeObserver(observer: Observer)\n" +
            "    + void notifyObservers()\n" +
            "}\n" +
            "\n" +
            "interface Observer <<interface>> {\n" +
            "    + void update()\n" +
            "}\n" +
            "\n" +
            "class MyTopic {\n" +
            "    - number: int\n" +
            "    + void registerObserver(observer: Observer)\n" +
            "    + void removeObserver(observer: Observer)\n" +
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
            "skin rose\n" +
            "title Generalization\n" +
            "\n" +
            "class Animal {}\n" +
            "class Mammal {}\n" +
            "interface Flyer <<interface>>{}\n" +
            "class Bat {}\n" +
            "\n" +
            "Animal <|-- Mammal\n" +
            "Animal <|-- Bat\n" +
            "Flyer <|.. Bat\n" +
            "\n" +
            "@enduml"
    },
    complete_generalization_test: {
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
    simple_association_rule_test: {
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
            "ClassA -- ClassC\n" +
            "ClassB \"0..3\" -- \"0..2\" ClassC  \n" +
            "ClassC \"2\" -- \"+\" ClassD \n" +
            "\n" +
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
    aggregation_composition_rule_test: {
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
            "ClassA o-- \"*\" ClassC : Aggregation\n" +
            "ClassB *-- \"0..2\" ClassC : Composition\n" +
            "@enduml"
    },
    computer_spiel: {
        code: "@startuml\n" +
            "\n" +
            "skin rose\n" +
            "\n" +
            "title Association - Class Diagram\n" +
            "\n" +
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
            "\n" +
            "class Spieler {}\n" +
            "Spielgebiet \"*\" -- \"1..4\" Spieler\n" +
            "\n" +
            "\n" +
            "class Position{\n" +
            " + x: int\n" +
            " + y: int\n" +
            " + z: int\n" +
            "}\n" +
            "Spielgebiet \"1\" -- \"100000\" Position\n" +
            "Position \"1\" -- \"1\" Gebietselement\n" +
            "\n" +
            "\n" +
            "abstract class Gebietselement{}\n" +
            "Spielgebiet o-- \"3..*\" Gebietselement\n" +
            "\n" +
            "class Gegenstand {\n" +
            "  + nehmen()\n" +
            "}\n" +
            "\n" +
            "Gebietselement <|-- Gegenstand\n" +
            "\n" +
            "class Gegner {\n" +
            "  + bekaempfen()\n" +
            "}\n" +
            "Gebietselement <|-- Gegner\n" +
            "Gegner \"1\" -- \"1\" Spielgebiet\n" +
            "\n" +
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
    }
}