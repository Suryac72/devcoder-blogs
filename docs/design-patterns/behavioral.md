# Behavioral Patterns

Behavioral patterns focus on **communication between objects** and distribution of responsibility. They define how objects interact with each other and divide responsibilities in ways that are more flexible than direct method calls.

**When to use:** When you need to define how objects communicate, manage complex workflows, or handle state changes dynamically.

---

## 1. Observer Pattern

### 🎯 Problem
You have a **Subject** (like a stock price), and multiple **Observers** (trading apps, alerts, charts) that need to be notified whenever the subject changes. If you hardcode notifications, adding new observers requires changing the subject code.

### ✅ Solution
The Observer Pattern defines a one-to-many relationship where when one object (Subject) changes state, all its observers are notified automatically.

### 🔑 Key Concepts

- **Subject/Observable**: Maintains state and notifies observers of changes
- **Observer**: Interface that observers implement
- **Concrete Observer**: Updates itself when notified
- **Push vs Pull**: Subject pushes data to observers, or observers pull data

### 💻 Code Example

```java
// Observer interface
interface StockObserver {
    void update(double price);
}

// Subject
class StockPrice {
    private double price;
    private List<StockObserver> observers = new ArrayList<>();
    
    public void attach(StockObserver observer) {
        observers.add(observer);
    }
    
    public void detach(StockObserver observer) {
        observers.remove(observer);
    }
    
    public void setPrice(double newPrice) {
        this.price = newPrice;
        notifyObservers();
    }
    
    private void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.update(price);
        }
    }
}

// Concrete observers
class TradingApp implements StockObserver {
    public void update(double price) {
        System.out.println("Trading App: Stock price is " + price);
    }
}

class PriceAlert implements StockObserver {
    public void update(double price) {
        if (price > 100) {
            System.out.println("Alert: Price exceeded $100");
        }
    }
}

// Usage
StockPrice apple = new StockPrice();
apple.attach(new TradingApp());
apple.attach(new PriceAlert());
apple.setPrice(105); // Both observers notified
```

### 🌍 Real-World Use Cases

- **Event handling** — Button clicks, mouse events in GUI frameworks
- **Model-View-Controller** — Model notifies views of changes
- **Social media** — Following someone and getting their notifications
- **Stock monitoring** — Price changes trigger alerts
- **Pub/Sub messaging** — Message brokers

### ✅ Advantages

✅ **Loose coupling** — Subject and observers are independent  
✅ **Dynamic relationships** — Add/remove observers at runtime  
✅ **Broadcast communication** — One change notifies many  
✅ **Easy to extend** — New observers don't require code changes  

### ❌ Disadvantages

❌ **Undefined order** — Observers notified in unpredictable order  
❌ **Memory leaks** — Must unregister observers or they remain in memory  
❌ **Performance** — Many observers = many notifications  
❌ **Difficult tracing** — Hard to see which observer is called  

---

## 2. Strategy Pattern

### 🎯 Problem
You need **multiple ways to do the same task** (e.g., payment methods: credit card, PayPal, Bitcoin), and you want to switch between them at runtime. Using if-else chains throughout code is inflexible.

### ✅ Solution
Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

### 🔑 Key Concepts

- **Strategy**: Interface for different algorithms
- **Concrete Strategy**: Specific algorithm implementation
- **Context**: Uses a strategy to execute the algorithm
- **Runtime Selection**: Choose strategy dynamically

### 💻 Code Example

```java
// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    
    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " with card " + cardNumber);
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;
    
    public PayPalPayment(String email) {
        this.email = email;
    }
    
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal: " + email);
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout(double total) {
        paymentStrategy.pay(total);
    }
}

// Usage
ShoppingCart cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment("1234-5678"));
cart.checkout(99.99);

cart.setPaymentStrategy(new PayPalPayment("user@email.com"));
cart.checkout(50.00);
```

### 🌍 Real-World Use Cases

- **Payment methods** — Credit card, PayPal, Google Pay
- **Sorting algorithms** — QuickSort, MergeSort, BubbleSort
- **Compression strategies** — ZIP, RAR, GZIP
- **Route planning** — Shortest, fastest, scenic routes
- **Authentication** — OAuth, JWT, Basic Auth

### ✅ Advantages

✅ **Eliminates if-else chains** — Cleaner code  
✅ **Runtime switching** — Change strategy anytime  
✅ **Easy testing** — Test each strategy independently  
✅ **Open/Closed Principle** — Add strategies without changing context  

### ❌ Disadvantages

❌ **Many classes** — One class per strategy  
❌ **Overhead** — For simple cases, may be overkill  
❌ **Strategy selection** — Logic must exist somewhere else  

---

## 3. State Pattern

### 🎯 Problem
Your object's behavior changes drastically based on its **internal state**. You end up with massive if-else statements checking the state in every method.

```java
// ❌ Bad: Large if-else chains
public void process() {
    if (state == PENDING) { ... }
    else if (state == PROCESSING) { ... }
    else if (state == COMPLETED) { ... }
}
```

### ✅ Solution
Encapsulates different behaviors for different states, making the object appear to change its class.

### 💻 Code Example

```java
// State interface
interface OrderState {
    void process(Order order);
    void ship(Order order);
}

// Concrete states
class PendingState implements OrderState {
    public void process(Order order) {
        System.out.println("Order processed");
        order.setState(new ProcessingState());
    }
    
    public void ship(Order order) {
        System.out.println("Cannot ship - order not processed yet");
    }
}

class ProcessingState implements OrderState {
    public void process(Order order) {
        System.out.println("Already processing");
    }
    
    public void ship(Order order) {
        System.out.println("Order shipped");
        order.setState(new ShippedState());
    }
}

// Context
class Order {
    private OrderState state = new PendingState();
    
    public void setState(OrderState state) {
        this.state = state;
    }
    
    public void process() {
        state.process(this);
    }
    
    public void ship() {
        state.ship(this);
    }
}

// Usage
Order order = new Order();
order.process(); // Pending -> Processing
order.ship();    // Processing -> Shipped
```

### 🌍 Real-World Use Cases

- **Order workflows** — Pending → Processing → Shipped → Delivered
- **Document lifecycle** — Draft → Review → Published → Archived
- **TCP connections** — Established, Listen, Closed states
- **Game characters** — Running, Jumping, Falling, Dead
- **Elevator states** — Moving Up, Moving Down, Idle

### ✅ Advantages

✅ **Eliminates large switch statements**  
✅ **Clear state transitions** — Easy to understand flow  
✅ **Each state in its own class** — Single Responsibility Principle  
✅ **Easy to add states** — Just create new state class  

### ❌ Disadvantages

❌ **Many classes** — One class per state  
❌ **Complexity** — For few states, may be overkill  
❌ **Context coupling** — States need reference to context  

---

## 4. Chain of Responsibility Pattern

### 🎯 Problem
A request needs to be processed by one of several **handlers in a chain**. You don't know which handler should process it, and you want flexibility in adding new handlers.

### ✅ Solution
Creates a chain of handler objects where each handler decides to process or pass the request.

### 💻 Code Example

```java
// Handler interface
abstract class SupportHandler {
    protected SupportHandler nextHandler;
    
    public void setNext(SupportHandler handler) {
        this.nextHandler = handler;
    }
    
    public void handle(SupportRequest request) {
        if (canHandle(request)) {
            process(request);
        } else if (nextHandler != null) {
            nextHandler.handle(request);
        } else {
            System.out.println("Request not handled");
        }
    }
    
    protected abstract boolean canHandle(SupportRequest request);
    protected abstract void process(SupportRequest request);
}

// Concrete handlers
class Level1Support extends SupportHandler {
    protected boolean canHandle(SupportRequest request) {
        return request.getPriority() <= 1;
    }
    
    protected void process(SupportRequest request) {
        System.out.println("Level 1 handled: " + request.getIssue());
    }
}

class Level2Support extends SupportHandler {
    protected boolean canHandle(SupportRequest request) {
        return request.getPriority() <= 2;
    }
    
    protected void process(SupportRequest request) {
        System.out.println("Level 2 handled: " + request.getIssue());
    }
}

// Usage
SupportHandler level1 = new Level1Support();
SupportHandler level2 = new Level2Support();
level1.setNext(level2);

SupportRequest request = new SupportRequest("Server down", 2);
level1.handle(request); // Passes to level2
```

### 🌍 Real-World Use Cases

- **Logging frameworks** — Info logger → Debug logger → Error logger
- **Approval workflows** — Manager → Director → VP
- **Servlet filters** — Request processing chain
- **Middleware** — Express.js, Spring Security interceptors
- **Exception handling** — Try-catch chains

### ✅ Advantages

✅ **Loose coupling** — Handlers don't know about each other  
✅ **Dynamic chains** — Build chains at runtime  
✅ **Easy to add handlers** — No code changes needed  

### ❌ Disadvantages

❌ **Request might not be handled** — If chain ends  
❌ **Difficult debugging** — Hard to trace request flow  
❌ **Performance** — Traversing the chain takes time  

---

## 5. Command Pattern

### 🎯 Problem
You need to **decouple the object making a request** from the one executing it. You also want to support undo/redo, queuing, and logging of requests.

### ✅ Solution
Encapsulates a request as an object, allowing you to parameterize with different requests and queue them.

### 💻 Code Example

```java
// Command interface
interface Command {
    void execute();
    void undo();
}

// Receiver
class TextEditor {
    private String text = "";
    
    public void write(String content) {
        text += content;
        System.out.println("Text: " + text);
    }
    
    public void delete(int length) {
        if (length <= text.length()) {
            text = text.substring(0, text.length() - length);
        }
        System.out.println("Text: " + text);
    }
}

// Concrete commands
class WriteCommand implements Command {
    private TextEditor editor;
    private String content;
    
    public WriteCommand(TextEditor editor, String content) {
        this.editor = editor;
        this.content = content;
    }
    
    public void execute() {
        editor.write(content);
    }
    
    public void undo() {
        editor.delete(content.length());
    }
}

// Invoker
class CommandHistory {
    private Stack<Command> history = new Stack<>();
    
    public void execute(Command command) {
        command.execute();
        history.push(command);
    }
    
    public void undo() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}

// Usage
TextEditor editor = new TextEditor();
CommandHistory history = new CommandHistory();
history.execute(new WriteCommand(editor, "Hello "));
history.execute(new WriteCommand(editor, "World"));
history.undo(); // Remove "World"
```

### 🌍 Real-World Use Cases

- **Undo/Redo** — Text editors, graphics tools
- **Remote controls** — Button commands
- **Job queues** — Scheduled tasks
- **Macro recording** — Office applications
- **Transaction systems** — Commit/rollback

### ✅ Advantages

✅ **Decouples invoker and receiver**  
✅ **Undo/Redo support** — Easy to implement  
✅ **Queueing** — Queue commands for later  
✅ **Logging** — Audit trail of commands  

### ❌ Disadvantages

❌ **More classes** — One class per command  
❌ **Overhead** — Additional layer of abstraction  
❌ **Undo complexity** — Managing state is tricky  

---

## 6. Interpreter Pattern

### 🎯 Problem
You need to **parse and execute expressions** in a language you define. For example, a calculator evaluating `(2 + 3) * 4`.

### ✅ Solution
Defines a grammar and an interpreter to evaluate sentences in that language.

### 🌍 Real-World Use Cases

- **SQL query parsing** — Database execution
- **Regular expressions** — Pattern matching
- **Mathematical expressions** — Calculators
- **Domain-specific languages** — Custom notations
- **Template engines** — Expression evaluation

---

## 7. Mediator Pattern

### 🎯 Problem
Multiple objects communicate with each other in complex ways. Each object must know about others, creating **tight coupling**.

### ✅ Solution
Defines an object that encapsulates how objects interact and centralizes communication.

### 💻 Code Example

```java
// Mediator
interface ChatMediator {
    void sendMessage(String message, User sender);
}

class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();
    
    public void addUser(User user) {
        users.add(user);
    }
    
    public void sendMessage(String message, User sender) {
        for (User user : users) {
            if (user != sender) {
                user.receive(message);
            }
        }
    }
}

// Colleagues
class User {
    private String name;
    private ChatMediator mediator;
    
    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }
    
    public void send(String message) {
        System.out.println(name + " sends: " + message);
        mediator.sendMessage(message, this);
    }
    
    public void receive(String message) {
        System.out.println(name + " receives: " + message);
    }
}
```

### 🌍 Real-World Use Cases

- **Chat rooms** — Users communicate through chat
- **Dialog boxes** — UI elements coordinate
- **Air traffic control** — Planes communicate through control tower
- **Game character interactions** — Controlled through game manager

---

## 8. Memento Pattern

### 🎯 Problem
You need to **save and restore an object's state** without exposing its internal structure (undo functionality).

### 💻 Code Example

```java
// Memento
class EditorMemento {
    private String content;
    
    public EditorMemento(String content) {
        this.content = content;
    }
    
    public String getContent() {
        return content;
    }
}

// Originator
class TextEditor {
    private String content = "";
    
    public void write(String text) {
        content += text;
    }
    
    public EditorMemento save() {
        return new EditorMemento(content);
    }
    
    public void restore(EditorMemento memento) {
        content = memento.getContent();
    }
}

// Caretaker
class EditorHistory {
    private Stack<EditorMemento> history = new Stack<>();
    
    public void save(TextEditor editor) {
        history.push(editor.save());
    }
    
    public void undo(TextEditor editor) {
        if (!history.isEmpty()) {
            editor.restore(history.pop());
        }
    }
}
```

### 🌍 Real-World Use Cases

- **Undo/Redo** — Saving snapshots
- **Database transactions** — Rollback functionality
- **Game saves** — Restore game state
- **Version control** — Commit history

---

## 9. Template Method Pattern

### 🎯 Problem
Multiple classes have the **same algorithm structure** but differ in details. You want to avoid code duplication.

### 💻 Code Example

```java
// Abstract template
abstract class ReportGenerator {
    public final void generate() { // Template method
        gatherData();
        formatData();
        outputReport();
    }
    
    protected abstract void gatherData();
    protected abstract void formatData();
    protected abstract void outputReport();
}

// Concrete implementations
class PDFReport extends ReportGenerator {
    protected void gatherData() { /* ... */ }
    protected void formatData() { /* ... */ }
    protected void outputReport() { System.out.println("PDF generated"); }
}

class HTMLReport extends ReportGenerator {
    protected void gatherData() { /* ... */ }
    protected void formatData() { /* ... */ }
    protected void outputReport() { System.out.println("HTML generated"); }
}
```

### 🌍 Real-World Use Cases

- **Game loops** — Initialization, update, render
- **Data processing** — Read, process, write
- **JUnit TestCase** — setUp, test, tearDown

---

## 10. Visitor Pattern

### 🎯 Problem
You need to **perform different operations** on objects in a structure without modifying their classes.

### 🌍 Real-World Use Cases

- **Compiler design** — Syntax tree traversal
- **Document processing** — Different element operations
- **File system** — Process files and directories

---

## 11. Iterator Pattern

### 🎯 Problem
You want to access elements of a collection **without exposing its structure**.

---

## Comparison Table: Behavioral Patterns

| Pattern | Use When | Complexity | Key Benefit |
|---------|----------|-----------|------------|
| **Observer** | Need notifications | Medium | Loose coupling |
| **Strategy** | Multiple algorithms | Medium | Runtime switching |
| **State** | Complex state logic | Medium | Clear state transitions |
| **Chain of Responsibility** | Dynamic handlers | Medium | Flexible chain building |
| **Command** | Undo/Redo needed | Medium | Request encapsulation |
| **Interpreter** | Parse expressions | High | Language interpretation |
| **Mediator** | Complex communication | High | Centralized control |
| **Memento** | Save/restore state | Medium | Encapsulated snapshots |
| **Template Method** | Code reuse needed | Low | Algorithm structure |
| **Visitor** | Multiple operations | High | Separate operations |

---

## Learning Checklist

- [ ] Implement Observer pattern with real event system
- [ ] Use Strategy pattern to replace if-else chains
- [ ] Build state machine with State pattern
- [ ] Create command handler with undo functionality
- [ ] Understand Mediator vs Observer differences
- [ ] Practice combining patterns in a workflow
