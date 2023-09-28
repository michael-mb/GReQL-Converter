export default {
    easy_test: {
        code: "@startuml\n" + "class Dwelling {\n" + "  +Int Windows\n" + "+void Lock()\n" + "}\n" + "@enduml"
    },
    class_test:  {
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
            "    + registerObserver(observer: Observer)\n" +
            "    + removeObserver(observer: Observer)\n" +
            "    + notifyObservers()\n" +
            "}\n" +
            "\n" +
            "interface Observer <<interface>> {\n" +
            "    + update()\n" +
            "}\n" +
            "\n" +
            "class MyTopic {\n" +
            "    - observers: Observer[]\n" +
            "    - number: int\n" +
            "    + registerObserver(observer: Observer)\n" +
            "    + removeObserver(observer: Observer)\n" +
            "    + notifyObservers()\n" +
            "}\n" +
            "\n" +
            "abstract class User {\n" +
            "    - username: string\n" +
            "    - alive: boolean \n" +
            "    + update()\n" +
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
            "  +makeSound()\n" +
            "}\n" +
            "\n" +
            "class Mammal {\n" +
            "  +Int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Bird {\n" +
            "  +Int layEggs()\n" +
            "}\n" +
            "\n" +
            "class Dog {\n" +
            "  +makeSound()\n" +
            "  +Int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Cat {\n" +
            "  +makeSound()\n" +
            "  +Int giveBirth()\n" +
            "}\n" +
            "\n" +
            "class Parrot {\n" +
            "  +makeSound()\n" +
            "  +Int layEggs()\n" +
            "}\n" +
            "\n" +
            "interface Swimmer <<interface>>{\n" +
            "  +swim()\n" +
            "}\n" +
            "\n" +
            "interface Flyer <<interface>>{\n" +
            "  +fly()\n" +
            "}\n" +
            "\n" +
            "class Dolphin {\n" +
            "  +makeSound()\n" +
            "  +Int giveBirth()\n" +
            "  +swim()\n" +
            "}\n" +
            "\n" +
            "class Bat {\n" +
            "  +makeSound()\n" +
            "  +Int giveBirth()\n" +
            "  +fly()\n" +
            "}\n" +
            "\n" +
            "class Duck {\n" +
            "  +makeSound()\n" +
            "  +Int layEggs()\n" +
            "  +swim()\n" +
            "  +fly()\n" +
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
    association_rule: {
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
            "ClassA \"1..2\" -- \"0..*\" ClassB : Association\n" +
            "ClassA o-- \"*\" ClassC : Aggregation\n" +
            "ClassB *-- \"0..2\" ClassC : Composition\n" +
            "ClassC -- ClassD  : Association\n" +
            "ClassC \"1\" -- \"1\" ClassE : Association\n" +
            "@enduml"
    },
    complex_association_rule: {
        code: ""
    }
    
}