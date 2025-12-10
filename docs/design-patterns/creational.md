# Creational Patterns

Creational patterns deal with **object creation mechanisms**, trying to create objects in a manner suitable to the situation. Instead of directly instantiating classes, they provide flexible and reusable ways to build objects.

**When to use:** When object creation logic is complex, when you need flexibility in how objects are built, or when you want to control the instantiation process.

---

## 1. Singleton Pattern

### 🎯 Problem
You need exactly **one instance** of a class throughout your application, and you want a global access point to that instance. Multiple instances would cause problems (like duplicate database connections or configuration conflicts).

### ✅ Solution
The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it.

### 🔑 Key Concepts

- **Private Constructor**: Prevents instantiation from outside the class
- **Static Instance**: Holds the single instance of the class
- **Static Access Method**: Provides global access (usually `getInstance()`)
- **Thread Safety**: Ensures only one instance even in multithreaded environments

### 💻 Implementation Types

| Type | When Created | Thread Safe | Use Case |
|------|--------------|-------------|----------|
| **Eager** | Class load time | ✅ Yes | Simple, always needed |
| **Lazy** | First access | ❌ No | Memory optimization |
| **Bill Pugh** | First access | ✅ Yes | Best approach |
| **Double-Checked** | First access | ✅ Yes | Performance optimized |

### 💡 Code Example

```java
// Bill Pugh Singleton (Most recommended)
public class DatabaseConnection {
    private DatabaseConnection() {}
    
    private static class SingletonHolder {
        static final DatabaseConnection INSTANCE = new DatabaseConnection();
    }
    
    public static DatabaseConnection getInstance() {
        return SingletonHolder.INSTANCE;
    }
}

// Usage
DatabaseConnection db = DatabaseConnection.getInstance();
```

### 🌍 Real-World Use Cases

- **Database connections** — Single connection pool for entire app
- **Logging frameworks** — Logger instances (Log4j, SLF4J)
- **Configuration managers** — Single configuration object
- **Thread pools** — Executor service
- **Caches** — In-memory cache instance
- **Spring ApplicationContext** — IoC container

### ✅ Advantages

✅ **Memory efficient** — Only one instance consumes memory  
✅ **Global access** — Easy to access from anywhere  
✅ **Lazy loading** — Can defer object creation  
✅ **Thread-safe options** — Multiple implementation approaches  

### ❌ Disadvantages

❌ **Hard to test** — Global state is difficult to mock  
❌ **Hidden dependencies** — Makes code harder to understand  
❌ **Not thread-safe** — All implementations aren't thread-safe  
❌ **Violates SRP** — Mixing singleton logic with business logic  

### ⚠️ Common Pitfalls

- Reflection can break the singleton pattern
- Serialization creates new instances on deserialization
- Cloning breaks singleton behavior
- Not implementing thread safety properly

---

## 2. Factory Pattern

### 🎯 Problem
You have multiple classes that implement the same interface, and you want to create instances without knowing the concrete classes. Hardcoding `new ConcreteClass()` throughout your code makes it inflexible.

### ✅ Solution
The Factory Pattern provides an interface for creating objects, but lets subclasses decide which class to instantiate.

### 🔑 Key Concepts

- **Creator Interface**: Declares factory method
- **Concrete Creator**: Implements factory method to create specific products
- **Product Interface**: Common interface for all created objects
- **Concrete Product**: Actual implementations

### 💻 Code Example

```java
// Product interface
interface Database {
    void connect();
}

// Concrete products
class MySQLDatabase implements Database {
    public void connect() { System.out.println("MySQL connected"); }
}

class PostgreSQLDatabase implements Database {
    public void connect() { System.out.println("PostgreSQL connected"); }
}

// Factory
abstract class DatabaseFactory {
    abstract Database createDatabase();
    
    void setupDatabase() {
        Database db = createDatabase();
        db.connect();
    }
}

class MySQLFactory extends DatabaseFactory {
    @Override
    Database createDatabase() {
        return new MySQLDatabase();
    }
}

// Usage
DatabaseFactory factory = new MySQLFactory();
factory.setupDatabase();
```

### 🌍 Real-World Use Cases

- **Database drivers** — MySQL, PostgreSQL, Oracle connections
- **UI components** — Creating buttons, text fields for different platforms
- **Payment processors** — PayPal, Stripe, Square
- **Loggers** — FileLogger, ConsoleLogger, DatabaseLogger
- **File parsers** — JSON, XML, CSV parsers

### ✅ Advantages

✅ **Loose coupling** — Client doesn't depend on concrete classes  
✅ **Flexible** — Easy to add new product types  
✅ **Centralized** — Creation logic in one place  
✅ **Follows SOLID** — Open/Closed Principle  

### ❌ Disadvantages

❌ **More classes** — Increases codebase complexity  
❌ **Overhead** — Can be overkill for simple cases  
❌ **Less transparent** — Harder to trace which class is created  

---

## 3. Abstract Factory Pattern

### 🎯 Problem
You need to create **families of related objects** that work together. For example, a Windows UI theme needs Windows buttons, Windows checkboxes, and Windows windows — all coordinated.

### ✅ Solution
The Abstract Factory Pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

### 🔑 Key Concepts

- **Abstract Factory**: Declares methods for creating related products
- **Concrete Factory**: Implements each method to create specific product family
- **Product Family**: Multiple related interfaces (e.g., Button, Checkbox)
- **Concrete Products**: Implementations for each theme/variant

### 💻 Code Example

```java
// Abstract products
interface Button { void paint(); }
interface Checkbox { void paint(); }

// Windows family
class WindowsButton implements Button {
    public void paint() { System.out.println("Windows button"); }
}
class WindowsCheckbox implements Checkbox {
    public void paint() { System.out.println("Windows checkbox"); }
}

// Mac family
class MacButton implements Button {
    public void paint() { System.out.println("Mac button"); }
}
class MacCheckbox implements Checkbox {
    public void paint() { System.out.println("Mac checkbox"); }
}

// Abstract factory
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete factories
class WindowsFactory implements GUIFactory {
    public Button createButton() { return new WindowsButton(); }
    public Checkbox createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}
```

### 🌍 Real-World Use Cases

- **UI frameworks** — Different themes (Windows, Mac, Linux)
- **Report generators** — PDF, HTML, Excel factories
- **Database abstractions** — Different dialects per database

### ✅ Advantages

✅ **Ensures consistency** — Related objects work well together  
✅ **Easy switching** — Change entire family with one line  
✅ **Encapsulation** — Hide product family details  

### ❌ Disadvantages

❌ **More complex** — Harder to understand than Factory Pattern  
❌ **Adding products** — Requires changes to all factories  
❌ **Overkill** — Can be over-engineering for simple cases  

---

## 4. Builder Pattern

### 🎯 Problem
You need to create complex objects with many optional parameters. Using constructors with many parameters becomes unreadable and error-prone (constructor telescoping).

```java
// ❌ Bad: Constructor telescoping
new Pizza(dough, sauce, cheese, pepperoni, mushrooms, olives, corn);
```

### ✅ Solution
The Builder Pattern provides a way to construct complex objects **step by step** using a fluent interface.

### 🔑 Key Concepts

- **Builder**: Constructs the product step-by-step
- **Director** (optional): Defines construction algorithm
- **Product**: Complex object being built
- **Fluent Interface**: Method chaining for readability

### 💻 Code Example

```java
public class Pizza {
    private String dough;
    private String sauce;
    private boolean cheese;
    private boolean pepperoni;
    private boolean mushrooms;
    
    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
    }
    
    public static class Builder {
        private String dough = "thin";
        private String sauce = "tomato";
        private boolean cheese = true;
        private boolean pepperoni = false;
        private boolean mushrooms = false;
        
        public Builder dough(String dough) {
            this.dough = dough;
            return this;
        }
        
        public Builder pepperoni() {
            this.pepperoni = true;
            return this;
        }
        
        public Pizza build() {
            return new Pizza(this);
        }
    }
}

// ✅ Usage: Clear and readable
Pizza pizza = new Pizza.Builder()
    .dough("thick")
    .pepperoni()
    .mushrooms()
    .build();
```

### 🌍 Real-World Use Cases

- **Complex configurations** — StringBuilder, HttpRequest builders
- **Database query builders** — SQL builders
- **UI construction** — HTML/XML builders
- **Immutable objects** — Safe object creation

### ✅ Advantages

✅ **Readable** — Self-documenting with fluent interface  
✅ **Flexible** — Optional parameters handled elegantly  
✅ **Immutable objects** — Can create thread-safe objects  
✅ **Fewer constructors** — Cleaner class design  

### ❌ Disadvantages

❌ **More code** — Need builder + product classes  
❌ **Overhead** — Performance cost vs simple constructor  
❌ **Not always necessary** — Overkill for simple objects  

---

## 5. Prototype Pattern

### 🎯 Problem
Creating new objects from scratch is **expensive** (database queries, file I/O, calculations). You'd rather copy an existing object and modify it.

### ✅ Solution
The Prototype Pattern creates new objects by **copying an existing object** (prototype) rather than creating from scratch.

### 🔑 Key Concepts

- **Prototype**: Original object that can be cloned
- **Shallow Copy**: Copies references to objects (not the objects themselves)
- **Deep Copy**: Copies everything, including nested objects
- **Clone Registry**: Keeps available prototypes for reuse

### 💻 Code Example

```java
public class User implements Cloneable {
    private String name;
    private String email;
    private List<String> roles;
    
    // Shallow copy
    @Override
    public User clone() throws CloneNotSupportedException {
        return (User) super.clone();
    }
    
    // Deep copy
    public User deepClone() throws CloneNotSupportedException {
        User cloned = (User) super.clone();
        cloned.roles = new ArrayList<>(this.roles);
        return cloned;
    }
}

// Usage
User admin = new User("Admin", "admin@example.com");
admin.addRole("ADMIN");

User copy = admin.deepClone();
copy.setName("User2");
// admin and copy are independent
```

### 🌍 Real-World Use Cases

- **Game development** — Cloning game objects, NPCs
- **Undo/Redo** — Saving state snapshots
- **Database records** — Duplicating records with modifications
- **UI components** — Copying widgets with different properties

### ✅ Advantages

✅ **Performance** — Copying faster than creating from scratch  
✅ **Flexibility** — Avoid subclassing for variations  
✅ **State snapshots** — Save object state for undo functionality  

### ❌ Disadvantages

❌ **Shallow vs Deep** — Confusion between copy types  
❌ **Circular references** — Can cause infinite loops  
❌ **Complexity** — Not obvious which objects are cloned  

---

## Comparison Table: Creational Patterns

| Pattern | Use When | Complexity | Key Benefit |
|---------|----------|-----------|------------|
| **Singleton** | Need single instance | Low | Memory efficient |
| **Factory** | Multiple object types | Medium | Flexible creation |
| **Abstract Factory** | Related object families | High | Ensures consistency |
| **Builder** | Complex objects | Medium | Readable construction |
| **Prototype** | Expensive creation | Medium | Performance gain |

---

## Learning Checklist

- [ ] Understand why Singleton is needed in applications
- [ ] Know when to use Factory vs Abstract Factory
- [ ] Build complex objects using Builder pattern
- [ ] Implement deep and shallow cloning
- [ ] Practice combining patterns in a project
