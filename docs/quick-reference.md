---
sidebar_position: 3
---

# Quick Reference Guide

A quick reference for commonly used concepts in technical interviews.

## Java Collections Cheat Sheet

### ArrayList vs LinkedList

```
ArrayList        LinkedList
Access: O(1)     Access: O(n)
Add end: O(1)    Add end: O(1)
Add start: O(n)  Add start: O(1)
Remove: O(n)     Remove: O(n)
```

### HashMap vs TreeMap vs LinkedHashMap

| Feature | HashMap | TreeMap | LinkedHashMap |
|---------|---------|---------|---------------|
| Order | No | Sorted | Insertion |
| Get/Put | O(1) | O(log n) | O(1) |
| Thread-Safe | No | No | No |
| Null Key | Yes | No | Yes |

## Design Pattern Selection

**When to use which pattern?**

- **Singleton** - Single instance needed (Logger, DB Connection)
- **Factory** - Create objects without specifying classes
- **Builder** - Complex object construction
- **Observer** - One-to-many dependency
- **Strategy** - Select algorithm at runtime
- **Decorator** - Add features dynamically
- **Adapter** - Interface compatibility

## Time Complexity Reference

| Data Structure | Access | Search | Insert | Delete |
|----------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| ArrayList | O(1) | O(n) | O(n) | O(n) |
| LinkedList | O(n) | O(n) | O(1) | O(1) |
| HashMap | O(1)* | O(1)* | O(1)* | O(1)* |
| TreeMap | O(log n) | O(log n) | O(log n) | O(log n) |
| HashSet | - | O(1)* | O(1)* | O(1)* |
| TreeSet | - | O(log n) | O(log n) | O(log n) |

*Average case

## Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

## Key Java Concepts

### Synchronized vs Volatile

```typescript
// Synchronized - mutual exclusion + visibility
synchronized void method() { }

// Volatile - visibility only, no locking
volatile int count;
```

### Immutable vs Thread-Safe

```typescript
// Immutable - inherently thread-safe
final class Immutable {
    private final int value;
}

// Thread-safe - protects mutable state
class ThreadSafe {
    private synchronized void method() { }
}
```

## OOP Principles

**SOLID Principles:**
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

## Common Interview Problems Patterns

1. **Two Pointers** - Reverse array, pair sum
2. **Sliding Window** - Subarray problems, string matching
3. **BFS/DFS** - Tree/graph traversal
4. **Dynamic Programming** - Overlapping subproblems
5. **Greedy** - Optimization problems
6. **Binary Search** - Sorted array search
7. **Hash Map** - Quick lookup
8. **Stack** - Parentheses matching, backtracking

## Pro Tips

✅ Always consider edge cases
✅ Optimize space complexity after time complexity
✅ Use appropriate data structures
✅ Know your time/space trade-offs
✅ Practice similar problem variations
✅ Explain your approach before coding
✅ Test with multiple examples
