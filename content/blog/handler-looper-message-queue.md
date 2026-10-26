---
title: Looper, Handler & Message Queue
description: How Android's Main Thread handle thousands of events
publishedAt: "2026-10-25"
published: true
tags:
  - Android
  - Concurrency
  - Threading
cover: images/cover-h-l-m.jpg
coverAlt: Oil rig old
---

In our [previous article](../concurrency-internals/) we have learned about some basic concepts like what is **Concurrency**, what is **Thread**, what is Android Main thread.

And mainly, how important it is for us as Android developers to understand the Android Main Thread to create apps that are Jank-free, ultra-responsive, and smooth.

Before we deep dive into the Architecture of the Android Main Thread.

Have you ever had a question in your mind like:

- How can a single Android UI thread handle user clicks, touch events, lifecycle callbacks, layout, drawing, and other app events?
- If the UI thread executes only one piece of code at a time, how does an app remain responsive while handling many events?
- What actually happens between a user tapping a button and its `OnClickListener` being executed?
- Is the main thread continuously running, or does it sleep when there is no work?

The answer to all of these questions lies in the mechanics of `Handler`, `Looper` and `MessageQueue`.

Let's deep dive!

## The Anatomy of Android’s Main Thread Architecture

Essentially, what we are going to look at is a fairly simple queuing mechanism beautifully designed to do hundreds of tasks in a chaos-free manner.

### MessageQueue — Todo List

At its core `MessageQueue`is a queue of `Message` objects waiting to be processed, sorted by their execution timestamp.

Any action done by the user while interacting with the UI of the app becomes a `Message` that gets added into the `MessageQueue` for processing.

![MessageQueue](images/message-queue.jpg)

Here is how a `Message` class looks like:

```java
public final class Message implements Parcelable {
    public int what;             // User-defined message type/code
    public int arg1;             // Optional low-cost integer payload
    public int arg2;             // Optional low-cost integer payload
    public Object obj;           // Optional arbitrary object payload

    long when;                   // Absolute time when it should run
    Bundle data;                 // Optional structured key-value payload
    Handler target;              // Handler that will dispatch this message
    Runnable callback;           // Optional Runnable executed instead of handleMessage()
    Messenger replyTo;           // Optional Messenger for a reply

    Message next;                // Internal linked-list pointer inside MessageQueue
    private static Message sPool; // Internal object pool
    private static final int sPoolSize = 50;
}
```

### **Looper — Infinite Event Loop**

Looper is an endless loop over a `MessageQueue` with an underlying thread that executes tasks as `Message`s sequentially, one by one.

Threads are expensive and if you think about how a user interacts with the app UI or the changes that happen on UI over a time of period are huge in numbers; just think about a simple animation. Creating a new thread for each UI task is out of the question.

To efficiently use the OS resources `Looper` prepares a `Thread` keep it alive as long as there are `Messages` inside the `MessageQueue`

For understanding purposes, two methods are very important if we talk about `Looper` class:

```java
Looper.prepare(); // Prepares a Thread and MessageQueue attached to this thread
Looper.loop(); // Infinite looping over MessageQueue 
```

Here is the actual implementation of the loop method:

```java
public static void loop() {
    final MessageQueue queue = myLooper().mQueue;
    
    for (;;) {  // infinite loop
        Message msg = queue.next();  // blocks until message available
        if (msg == null) return;     // null = quit signal
        
        msg.target.handleMessage(msg);  // dispatch to the Handler
        msg.recycleUnchecked();         // return to pool
    }
}
```

That's it. It takes a message, executes it on the underlying thread, and repeats endlessly.

### **Handler — The Task Coordinator**

Handler only job is:

1. To enqueue Messages to `MessageQueue`.
2. Handles any post processing/Callbacks once the Looper finishes executing a `Message`.

Here is an Example of how you can enqueue work on the main thread using Handler.

```java
// Post a Runnable — runs on the main thread
val mainHandler = Handler(Looper.getMainLooper())

mainHandler.post {
    textView.text = "Update Text" 
}

// Post with a delay
mainHandler.postDelayed({
    showToast("After 5 seconds")
}, 5000)
```

Remember, without Handler you can't access the underlying main thread directly for task execution or task queuing.

For a better mental model, below is an illustration of how the whole process goes step by step.

![Handler, Looper, MessageQueue in Action](images/hand-loop-mesqu.png)

There are cases when a task is too big or requires a lot of time, like any IO API call or any CPU-intensive computation; in such cases, we can create a separate thread, usually called a background thread, that executes the big task, and only once the task is finished can we update the UI via the Main thread `Handler` .

## What is runOnUiThread()

In principle, it's another method to enqueue work on the Main UI thread. To your surprise! It's basically a wrapper over the actual Handler for our Main Thread.

```java
public void runOnUiThread(Runnable action) {
    if (Thread.currentThread() != mUiThread) {
        mHandler.post(action);  // posts to main Looper's queue
    } else {
        action.run();  // already on main thread, runs directly
    }
}
```

Simply put, there are different ways, but the math is the same for putting work on the Main Thread:

- `runOnUiThread` → A different way of calling Handler.
- `Dispatchers.Main` → Kotlin Coroutines way of talking with Handler.
- `Handler.post()` → Handler’s own way of enqueuing work on the main thread.
- `View.post()` → View’s way of enqueuing work on the main thread.

**Well, that’s basically it at its core!**

Lastly, I would like to correlate a couple of questions to better understand the concepts described above.

### Why do ANRs happen even when we have the Event Loop in place on the main thread?

Looper processes tasks one by one sequentially; if a task at hand takes a lot of time to execute, then the MessageQueue backs up, and enqueued tasks wait while the thread is stuck doing the long task at hand.

Each user touch keeps on adding tasks to the MessageQueue. Since the Main thread is stuck, the screen freezes. **`ActivityManager`** and **`WindowManager`** System services observe this flag and report to the OS about unresponsiveness. After 5 seconds, the system gives the Option to the user to quit the app via an ANR dialog. ANR is actually a graceful way out for the user from an unresponsive app.

### If the Looper is an infinite loop, doesn’t it drain the system resources or battery?

Simple answer is no! Once `MessageQueue` runs out of tasks, the underlying Thread sleeps with Zero CPU usage. OS uses epoll, a polling technique, where it wakes the sleeping thread once new messages get added to the MessageQueue

### What is HandlerThread, and how is it different from a regular Thread?

A `HandlerThread` starts a thread, prepares its Looper, and runs its message loop. A regular thread does not automatically provide this message-processing mechanism.

### Difference B/W HandlerThread vs ExecutorService vs coroutines?

- HandlerThread: Serial event processing through a Looper and queue.
- ExecutorService: Task execution through a configurable thread pool or executor.
- Coroutines: Structured asynchronous programming with suspension, cancellation, and dispatchers.

## Key Takeaways

- In Android, **Handler**, **Looper**, and **`MessageQueue`** are three parts of a system that lets a thread process tasks one at a time, in an organized way.
- Who submits the task, and who handles the message? **Handler**
- Where does the task wait? **`MessageQueue`**
- Who retrieves the task and executes it? **Looper**

I hope these concepts will eventually allow you to build apps that are responsive and debug concurrency-related issues confidently!