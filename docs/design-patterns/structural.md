# Structural Patterns

Structural patterns deal with **object composition** and relationships. They help compose objects into larger structures while maintaining flexibility and efficiency.

**When to use:** When you need to organize objects, add responsibilities, simplify complex systems, or make incompatible things work together.

---

## 1. Adapter Pattern

### 🎯 Problem
You have two **incompatible interfaces** that need to work together. For example, you have an old library expecting `LegacyPaymentProcessor` but your new code uses `ModernPaymentGateway`. Without an adapter, they can't communicate.

### ✅ Solution
The Adapter Pattern converts one interface into another that clients expect, allowing incompatible interfaces to work together.

### 🔑 Key Concepts

- **Target**: The interface that clients expect
- **Adapter**: The converter between incompatible interfaces
- **Adaptee**: The class with the incompatible interface
- **Client**: Uses the target interface

### 💻 Code Example

```typescript
// Existing interface (Adaptee)
class LegacyPaymentProcessor {
    public boolean processPayment(double amount) {
        System.out.println("Legacy payment: " + amount);
        return true;
    }
}

// Modern interface expected by new code (Target)
interface PaymentGateway {
    void pay(double amount);
}

// Adapter
class PaymentAdapter implements PaymentGateway {
    private LegacyPaymentProcessor legacy;
    
    public PaymentAdapter(LegacyPaymentProcessor legacy) {
        this.legacy = legacy;
    }
    
    @Override
    public void pay(double amount) {
        if (legacy.processPayment(amount)) {
            System.out.println("Payment successful");
        }
    }
}

// Usage
LegacyPaymentProcessor old = new LegacyPaymentProcessor();
PaymentGateway gateway = new PaymentAdapter(old);
gateway.pay(100); // Old system works with new interface
```

### 🌍 Real-World Use Cases

- **Power adapters** — Convert voltage standards
- **Database drivers** — JDBC adapters for different databases
- **Framework wrappers** — Making legacy APIs work with new code
- **Payment integrations** — Different payment providers
- **Audio/video converters** — HDMI to VGA adapters

### ✅ Advantages

✅ **Bridge incompatible interfaces** — Makes old and new code work  
✅ **Reuse existing code** — Don't rewrite working classes  
✅ **Single Responsibility** — Separation of concerns  
✅ **Open/Closed Principle** — Extend without modifying existing code  

### ❌ Disadvantages

❌ **Additional class** — More complexity  
❌ **Can hide design issues** — May indicate poor design  
❌ **Debugging difficulty** — Extra layer of abstraction  

---

## 2. Bridge Pattern

### 🎯 Problem
You have a hierarchy that would **explode with combinations**. For example:
- Shape hierarchy: Circle, Square, Triangle
- Color variants: Red, Green, Blue
- This creates 3 × 3 = 9 classes!

Instead of extending both shape and color, bridge them separately.

### ✅ Solution
Decouples an abstraction from its implementation so they can vary independently.

### 🔑 Key Concepts

- **Abstraction**: High-level interface (e.g., Shape)
- **Refined Abstraction**: Extended abstraction (e.g., Circle)
- **Implementor**: Implementation interface (e.g., Color)
- **Concrete Implementor**: Actual implementation (e.g., RedColor)

### 💻 Code Example

```typescript
// Implementor (separate from shape)
interface Color {
    String getColor();
}

class RedColor implements Color {
    public String getColor() { return "Red"; }
}

class BlueColor implements Color {
    public String getColor() { return "Blue"; }
}

// Abstraction uses implementor (Bridge)
abstract class Shape {
    protected Color color;
    
    public Shape(Color color) {
        this.color = color;
    }
    
    abstract void draw();
}

// Refined abstractions
class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }
    
    @Override
    void draw() {
        System.out.println("Circle in " + color.getColor());
    }
}

class Square extends Shape {
    public Square(Color color) {
        super(color);
    }
    
    @Override
    void draw() {
        System.out.println("Square in " + color.getColor());
    }
}

// Usage: Create any combination without 9 classes!
Shape redCircle = new Circle(new RedColor());
redCircle.draw(); // Circle in Red

Shape blueSquare = new Square(new BlueColor());
blueSquare.draw(); // Square in Blue
```

### 🌍 Real-World Use Cases

- **Cross-platform apps** — Windows/Mac implementations
- **Database abstraction** — Different SQL dialects
- **Graphics libraries** — Different rendering backends
- **Communication channels** — TCP, UDP implementations

### ✅ Advantages

✅ **Avoids class explosion** — Avoid 2D inheritance hierarchies  
✅ **Independent variation** — Abstraction and implementation separate  
✅ **Better encapsulation** — Hide implementation details  

### ❌ Disadvantages

❌ **More complex** — Harder to understand  
❌ **Overhead** — Extra indirection for simple cases  

---

## 3. Composite Pattern

### 🎯 Problem
You have a **tree structure** (like a file system) where folders contain files and other folders. You want to treat individual files and folders **uniformly** without checking "is this a file or folder?".

### ✅ Solution
Composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions uniformly.

### 🔑 Key Concepts

- **Component**: Common interface for leaves and composites
- **Leaf**: Represents individual objects (files)
- **Composite**: Container that can hold other components (folders)
- **Recursive**: Composites can contain composites

### 💻 Code Example

```typescript
// Component interface
interface FileSystemComponent {
    void display(int depth);
}

// Leaf
class File implements FileSystemComponent {
    private String name;
    
    public File(String name) {
        this.name = name;
    }
    
    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth) + "📄 " + name);
    }
}

// Composite
class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> contents = new ArrayList<>();
    
    public Folder(String name) {
        this.name = name;
    }
    
    public void add(FileSystemComponent component) {
        contents.add(component);
    }
    
    @Override
    public void display(int depth) {
        System.out.println("  ".repeat(depth) + "📁 " + name);
        for (FileSystemComponent component : contents) {
            component.display(depth + 1);
        }
    }
}

// Usage: Treat both uniformly
Folder root = new Folder("root");
root.add(new File("readme.txt"));

Folder docs = new Folder("Documents");
docs.add(new File("resume.pdf"));
root.add(docs);

root.display(0); // Shows tree structure
```

### 🌍 Real-World Use Cases

- **File systems** — Folders and files
- **GUI frameworks** — Panels, buttons, text fields
- **Organization charts** — Departments and employees
- **Menu systems** — Menus with submenus

### ✅ Advantages

✅ **Uniform treatment** — Same interface for parts and wholes  
✅ **Simple code** — Clients don't check object type  
✅ **Easy trees** — Build hierarchies naturally  
✅ **Flexible** — Add new component types easily  

### ❌ Disadvantages

❌ **Type checking** — Can't easily restrict children types  
❌ **Overhead** — Performance cost for simple objects  
❌ **Design limitations** — Less control over structure  

---

## 4. Decorator Pattern

### 🎯 Problem
You need to **add features to objects dynamically**. For example, a coffee cup can have different additions: sugar, milk, caramel, chocolate. Using inheritance creates an explosion of classes:

```
Coffee → CoffeeWithSugar → CoffeeWithSugarAndMilk → ...
```

### ✅ Solution
Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.

### 🔑 Key Concepts

- **Component**: Original interface
- **Concrete Component**: The object being decorated
- **Decorator**: Base decorator implementing component interface
- **Concrete Decorator**: Adds specific functionality
- **Wrapping**: Decorator wraps the component

### 💻 Code Example

```typescript
// Component interface
interface Coffee {
    double getCost();
    String getDescription();
}

// Concrete component
class BasicCoffee implements Coffee {
    @Override
    public double getCost() { return 2.0; }
    
    @Override
    public String getDescription() { return "Basic Coffee"; }
}

// Decorator base class
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double getCost() { return coffee.getCost() + 0.5; }
    
    @Override
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double getCost() { return coffee.getCost() + 0.2; }
    
    @Override
    public String getDescription() { return coffee.getDescription() + ", Sugar"; }
}

// Usage: Stack decorators for any combination
Coffee coffee = new BasicCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

System.out.println(coffee.getDescription()); // Basic Coffee, Milk, Sugar
System.out.println(coffee.getCost()); // 2.7
```

### 🌍 Real-World Use Cases

- **Java IO streams** — FileInputStream wrapped with BufferedInputStream
- **Text formatting** — Bold, italic, underline
- **Feature toggles** — Add logging, caching, authorization
- **UI enhancements** — Borders, scrollbars, titles on components

### ✅ Advantages

✅ **Flexible** — Add features at runtime  
✅ **No subclass explosion** — Avoid creating many classes  
✅ **Single Responsibility** — Each decorator has one job  
✅ **Stackable** — Combine multiple decorators  

### ❌ Disadvantages

❌ **Many objects** — Each wrapper adds an object  
❌ **Order matters** — Decorator order can affect results  
❌ **Debugging** — Hard to trace with many layers  

---

## 5. Facade Pattern

### 🎯 Problem
Your client code needs to interact with a **complex subsystem** with many interdependent classes. This creates tight coupling and difficult code.

### ✅ Solution
Provides a unified, simplified interface to a complex subsystem.

### 💻 Code Example

```typescript
// Complex subsystem classes
class Lights {
    public void on() { System.out.println("Lights on"); }
    public void off() { System.out.println("Lights off"); }
}

class Temperature {
    public void warm() { System.out.println("Temperature warming"); }
}

class Entertainment {
    public void startMovie() { System.out.println("Movie started"); }
}

// Facade: Simplifies interaction
class HomeAutomation {
    private Lights lights;
    private Temperature temperature;
    private Entertainment entertainment;
    
    public HomeAutomation() {
        this.lights = new Lights();
        this.temperature = new Temperature();
        this.entertainment = new Entertainment();
    }
    
    // Simple methods that hide complexity
    public void movieTime() {
        lights.off();
        temperature.warm();
        entertainment.startMovie();
    }
    
    public void leavingHome() {
        lights.off();
    }
}

// Usage: Simple and clean
HomeAutomation home = new HomeAutomation();
home.movieTime(); // Does all setup automatically
```

### 🌍 Real-World Use Cases

- **Database frameworks** — Hibernate hiding SQL complexity
- **API wrappers** — Simplifying complex APIs
- **Logging frameworks** — SLF4J facade for multiple loggers
- **Spring Data** — Simplifying database operations
- **Home automation** — Single interface for multiple systems

### ✅ Advantages

✅ **Simplifies complex systems** — Hide internal complexity  
✅ **Decouples clients** — Don't depend on subsystem classes  
✅ **Easier to maintain** — Central control point  

### ❌ Disadvantages

❌ **God Object** — Facade can become too large  
❌ **Hidden features** — Advanced users can't access subsystem directly  
❌ **Additional layer** — Slight performance overhead  

---

## 6. Flyweight Pattern

### 🎯 Problem
You need to create **millions of similar small objects** (like characters in a text editor, particles in a game, or tiles in a map). Memory usage becomes prohibitive.

### ✅ Solution
Uses sharing to support large numbers of objects efficiently by sharing common state.

### 🔑 Key Concepts

- **Intrinsic State**: Shared, immutable data (font, color)
- **Extrinsic State**: Unique per object (position, specific text)
- **Flyweight Factory**: Creates and caches flyweights
- **Object Pooling**: Reuse objects instead of creating new ones

### 💻 Code Example

```typescript
// Flyweight
class Character {
    private char symbol;
    private String font;
    
    public Character(char symbol, String font) {
        this.symbol = symbol;
        this.font = font;
    }
    
    public void display(int row, int col) {
        System.out.println("'" + symbol + "' at (" + row + "," + col + ") in " + font);
    }
}

// Flyweight Factory
class CharacterFactory {
    private static Map<String, Character> cache = new HashMap<>();
    
    public static Character getCharacter(char symbol, String font) {
        String key = symbol + "-" + font;
        
        if (!cache.containsKey(key)) {
            cache.put(key, new Character(symbol, font));
        }
        
        return cache.get(key);
    }
}

// Usage: Reuse same character object
Character a1 = CharacterFactory.getCharacter('A', "Arial");
Character a2 = CharacterFactory.getCharacter('A', "Arial");
System.out.println(a1 == a2); // true - same object!

a1.display(0, 0);
a2.display(0, 1);
```

### 🌍 Real-World Use Cases

- **Text editors** — Sharing character objects
- **Game particle systems** — Reusing particle objects
- **String interning** — Java's String pool
- **Connection pooling** — Database connections

### ✅ Advantages

✅ **Memory savings** — Massive reduction with millions of objects  
✅ **Performance** — Fewer objects to manage  
✅ **Centralization** — Shared state in one place  

### ❌ Disadvantages

❌ **Complexity** — Intrinsic vs extrinsic state confusion  
❌ **Thread safety** — Shared objects must be thread-safe  
❌ **Debugging** — Hidden object reuse makes debugging harder  

---

## 7. Proxy Pattern

### 🎯 Problem
You want to **control access** to another object, provide a **placeholder** until the object is needed, or **log/monitor** access.

### ✅ Solution
Provides a surrogate or placeholder that controls access to the real object.

### 🔑 Key Concepts

- **Subject**: Common interface
- **Real Subject**: Actual object
- **Proxy**: Controls access to real subject
- **Types**:
  - **Protection Proxy** — Access control
  - **Virtual Proxy** — Lazy initialization
  - **Cache Proxy** — Caching results
  - **Remote Proxy** — Represents distant object

### 💻 Code Example

```typescript
// Subject interface
interface DataService {
    String fetchData(String id);
}

// Real subject - expensive operation
class RealDataService implements DataService {
    @Override
    public String fetchData(String id) {
        System.out.println("Fetching from database: " + id);
        // Simulate expensive operation
        return "Data for " + id;
    }
}

// Proxy with caching
class CachedDataServiceProxy implements DataService {
    private RealDataService realService = new RealDataService();
    private Map<String, String> cache = new HashMap<>();
    
    @Override
    public String fetchData(String id) {
        if (cache.containsKey(id)) {
            System.out.println("Returning from cache: " + id);
            return cache.get(id);
        }
        
        String data = realService.fetchData(id);
        cache.put(id, data);
        return data;
    }
}

// Usage
DataService service = new CachedDataServiceProxy();
service.fetchData("user1"); // Fetches and caches
service.fetchData("user1"); // Returns from cache
```

### 🌍 Real-World Use Cases

- **Lazy loading** — Load heavy objects only when needed
- **Access control** — Check permissions before allowing access
- **Logging** — Track all access to sensitive objects
- **Remote objects** — Network calls to distant services
- **Caching** — Cache expensive operations

### ✅ Advantages

✅ **Controls access** — Restrict operations on real object  
✅ **Lazy initialization** — Defer expensive creation  
✅ **Caching** — Improve performance  
✅ **Logging/Monitoring** — Track access  

### ❌ Disadvantages

❌ **Additional object** — More memory usage  
❌ **Performance** — Extra layer slows access  
❌ **Complexity** — More code to maintain  

---

## Comparison Table: Structural Patterns

| Pattern | Use When | Complexity | Key Benefit |
|---------|----------|-----------|------------|
| **Adapter** | Incompatible interfaces | Low | Bridge incompatible APIs |
| **Bridge** | Avoiding class explosion | Medium | Independent variations |
| **Composite** | Tree structures | Medium | Uniform treatment |
| **Decorator** | Dynamic features | Medium | Flexible feature addition |
| **Facade** | Complex subsystems | Low | Simplified interface |
| **Flyweight** | Millions of objects | High | Memory efficiency |
| **Proxy** | Controlled access | Medium | Access control |

---

## Learning Checklist

- [ ] Use Adapter to integrate incompatible libraries
- [ ] Apply Bridge to separate abstraction from implementation
- [ ] Build tree structures with Composite
- [ ] Stack Decorators for dynamic behavior
- [ ] Simplify complex systems with Facade
- [ ] Implement Flyweight for memory efficiency
- [ ] Control access with Proxy pattern
