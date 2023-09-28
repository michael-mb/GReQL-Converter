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
            "ClassA \"1..2\" -- \"0..*\" ClassB : Association\n" +
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
            " Name: String\n" +
            "}\n" +
            "\n" +
            "class Enrollment {\n" +
            "  drop()\n" +
            "  cancel()\n" +
            "}\n" +
            "\n" +
            "Student \"0..*\" - \"1..*\" Course\n" +
            "(Student, Course) .. Enrollment\n" +
            "\n" +
            "@enduml"
    },
    battleship_diagram_test: {
        code: "@startuml\n" +
            "\n" +
            "hide circle\n" +
            "\n" +
            "skinparam classFontStyle bold\n" +
            "\n" +
            "skinparam classAttributeIconSize 0\n" +
            "\n" +
            "\n" +
            "\n" +
            "class BattleshipGame {\n" +
            "    - inputboard : ArrayList<ArrayList>\n" +
            "    +playgame(board:board,player:player)\n" +
            "\n" +
            "}\n" +
            "\n" +
            "class Board {\n" +
            "    \n" +
            "    - virtualboard : ArrayList<ArrayList>\n" +
            "    - ships : ArrayList<ship>\n" +
            "    - traps : ArrayList<trap>\n" +
            "    - potions : ArrayList<potion>\n" +
            "\n" +
            "    +createboard() : ArrayList<ArrayList>\n" +
            "    +createships(num:int)\n" +
            "    +createtraps(num:int)\n" +
            "    +createpotions(num:int)\n" +
            "    +isoverlap(temp:potion) : boolean\n" +
            "    +getship() : ArrayList<ship>\n" +
            "    +gettrap() : ArrayList<trap>\n" +
            "    +getpotion() : ArrayList<potion>\n" +
            "    +getvirtualboard() : ArrayList<ArrayList>\n" +
            "    +displayboard(board : ArrayList<ArrayList>)\n" +
            "    \n" +
            "}\n" +
            "\n" +
            "\n" +
            "class Player {\n" +
            "    - live : int\n" +
            "    - steptaken : int\n" +
            "    - inputx : int\n" +
            "    - inputy : int\n" +
            "    - shipfound : int\n" +
            "    \n" +
            "    +getsteptaken() : int\n" +
            "    +addstep()\n" +
            "    +setlive(l:int)\n" +
            "    +getlive() : int\n" +
            "    +getshipfound() : int\n" +
            "    +setshipfound()\n" +
            "}\n" +
            "\n" +
            "class Potion {\n" +
            "    - y : int\n" +
            "    - x : int\n" +
            "    - length : int\n" +
            "    - isused : boolean\n" +
            "\n" +
            "    +gety() : int\n" +
            "    +sety(y:int)\n" +
            "    +getx(i:int) : int\n" +
            "    +getlength() : int\n" +
            "    +isused() : boolean\n" +
            "    +setused()\n" +
            "}\n" +
            "\n" +
            "class Ship {\n" +
            "    -posx : ArrayList<Object>\n" +
            "    -posy : int\n" +
            "    -length : int\n" +
            "    -sunken : boolean\n" +
            "    \n" +
            "    +setposition(len:int)\n" +
            "    +setsunken()\n" +
            "    +getx(i:int) : int\n" +
            "    +gety() : int\n" +
            "    +getposx() : ArrayList<Object>\n" +
            "    +issunken() : boolean\n" +
            "    +getlength() : int\n" +
            "    +generateposition(x:int,y:int,len:int)\n" +
            "\n" +
            "}\n" +
            "\n" +
            "class Trap {\n" +
            "    - lives : int\n" +
            "    - y : int\n" +
            "    - x : int\n" +
            "    - reveal : boolean\n" +
            "    \n" +
            "    +gety() : int\n" +
            "    +getx(i:int) : int\n" +
            "    +revealed()\n" +
            "    +isrevealed() : boolean\n" +
            "    +getlive() : int\n" +
            "    +getlength() : int\n" +
            "    \n" +
            "}\n" +
            "\n" +
            "class ShipRevealPotion {\n" +
            "    +revealship(temp:ArrayList<ship>, board:ArrayList<ArrayList>)\n" +
            "}\n" +
            "\n" +
            "class LifeSaverPotion {\n" +
            "    + reveal()\n" +
            "}\n" +
            "\n" +
            "class TrapRevealPotion {\n" +
            "    + revealtrap(temp:board, board:ArrayList<ArrayList>)\n" +
            "}\n" +
            "\n" +
            "BattleshipGame \"1\" *-- \"1\" Board\n" +
            "BattleshipGame \"1\" *-- \"1\" Player\n" +
            "\n" +
            "Board \"1\" *-- \"20..80\" Ship\n" +
            "Board \"1\"  *-- \"10..30\" Trap\n" +
            "Board \"1\"  *-- \"0..18\" Potion\n" +
            "\n" +
            "Potion <|-- ShipRevealPotion\n" +
            "Potion <|-- LifeSaverPotion\n" +
            "Potion <|-- TrapRevealPotion\n" +
            "\n" +
            "\n" +
            "\n" +
            "@enduml"
    }
    
}