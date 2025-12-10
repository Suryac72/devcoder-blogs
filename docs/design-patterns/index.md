# Design Patterns

Design patterns are **reusable solutions to common problems** in software design. They are proven techniques that experienced developers use to build flexible, maintainable, and scalable code. Think of them as **blueprints or templates** for solving recurring design problems.

## Why Learn Design Patterns?

✅ **Write Better Code** — Create code that's clean, understandable, and follows best practices  
✅ **Solve Problems Faster** — Use proven solutions instead of reinventing the wheel  
✅ **Communicate Better** — Use a common vocabulary with other developers  
✅ **Build Maintainable Systems** — Code that's easier to extend and modify over time  
✅ **Ace Job Interviews** — Essential knowledge for senior developer roles  

---

## The Three Categories (23 Gang of Four Patterns)

Design patterns are organized into three main categories based on their purpose:

### 🏗️ [Creational Patterns](creational.md) — How to Create Objects
Focus on **object creation mechanisms**. They provide flexible ways to instantiate objects without specifying exact classes.

**Patterns:** Singleton, Factory, Abstract Factory, Builder, Prototype  
**Best for:** Complex initialization, managing object creation, ensuring single instances

### 🔄 [Behavioral Patterns](behavioral.md) — How Objects Communicate
Focus on **communication between objects** and distribution of responsibility. They define how objects interact and work together.

**Patterns:** Observer, Strategy, State, Chain of Responsibility, Command, Interpreter, Mediator, Memento, Template Method, Visitor  
**Best for:** Defining object interactions, managing state changes, handling complex workflows

### 🔗 [Structural Patterns](structural.md) — How to Compose Objects
Focus on **object composition** and relationships. They help you organize objects into larger structures while maintaining flexibility.

**Patterns:** Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy  
**Best for:** Building relationships between objects, adding functionality, simplifying complex systems

---

## Quick Reference: When to Use Each Pattern

| Problem | Solution | Pattern |
|---------|----------|---------|
| Need only one instance of a class | Restrict instantiation | **Singleton** |
| Multiple ways to create an object | Abstract creation logic | **Factory / Abstract Factory** |
| Complex object with many options | Build step-by-step | **Builder** |
| Clone existing objects | Copy prototype | **Prototype** |
| Notify multiple objects of changes | One-to-many relationship | **Observer** |
| Multiple algorithms for same task | Switch at runtime | **Strategy** |
| Change behavior based on state | Encapsulate state logic | **State** |
| Pass requests through handlers | Chain of responsibility | **Chain of Responsibility** |
| Undo/Redo functionality | Save state snapshots | **Memento** |
| Make incompatible classes work together | Convert interface | **Adapter** |
| Organize hierarchical structures | Tree representation | **Composite** |
| Add features dynamically | Wrap with decorators | **Decorator** |
| Simplify complex subsystems | Single unified interface | **Facade** |
| Support millions of small objects | Share common state | **Flyweight** |
| Control access to another object | Intermediary object | **Proxy** |

---

## How to Learn This Guide

1. **Start with the category** that matches your current challenge
2. **Read the problem description** to understand when this pattern is needed
3. **Study the key concepts** to understand how it works
4. **Look at code examples** to see real-world implementation
5. **Review advantages and disadvantages** to make informed decisions
6. **Practice by coding** — implement patterns in your projects

---

## Pro Tips for Learning

💡 **Don't memorize** — Focus on understanding the problem it solves  
💡 **Combine patterns** — Real systems often use multiple patterns together  
💡 **Start simple** — Only use patterns when you actually need them  
💡 **Refactor toward patterns** — Discover patterns through refactoring, don't force them  
💡 **Understand trade-offs** — Every pattern has pros and cons  

---

## Ready to Dive In?

Pick a category and start learning:

- [Creational Patterns](creational.md) — Object creation strategies
- [Behavioral Patterns](behavioral.md) — Object communication & interaction  
- [Structural Patterns](structural.md) — Object composition & relationships
