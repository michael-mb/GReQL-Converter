export default {
    default_easy_test: "@startuml\n" + "class Dwelling {\n" + "  +Int Windows\n" + "+void Lock()\n" + "}\n" + "@enduml",
    default_class_test:  "@startuml\n" +
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
            "@enduml",
    default_generalization_test: ""
    
}