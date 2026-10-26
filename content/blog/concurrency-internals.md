---
title: Android Concurrency Internals Every Android Developer Needs to Know
description: A look at How Concurrency in Android works in general
publishedAt: "2026-10-20"
published: true
tags:
  - Android
  - Concurrency
  - Threading
cover: images/loom-threads.png
coverAlt: Loom making threads.
---

## TL;DR
In this article, we’ll explore concurrency, understand what threads are, and dive into how the UI or Main Thread works in Android and what makes it different from other threads. **If you’re already familiar with these concepts, feel free to skip ahead!**

## What is Concurrency at the OS Level?

**Concurrency** is **the ability of a program or an operating system to work on multiple tasks at the same time**. Instead of finishing one entire task before starting the next, a concurrent system breaks tasks into smaller pieces and juggles them.

The core of concurrency is based on **Interruptibility**; if we can divide a big task into multiple smaller tasks that are interruptible at any moment, then we can achieve this concept of concurrency, where the OS can interrupt any task and juggle between different tasks to make progress evenly. 

This serves us a lot of benefits:

1. Applications can remain responsive while other tasks are running.
2. When one task waits for a network response, disk access, or user input, another task can make progress.
3. A system may complete more tasks within a given period by overlapping independent work and reducing idle time.
4. The CPU, network, and storage devices can be used more effectively when independent tasks overlap.

## Wait! But what are Threads?

To achieve concurrency at the OS level, we need a way to process long tasks broken into smaller units so that they are interruptible and resumable, with a bit of their own state. OS uses Threads as a conceptual computational unit to process those smaller units of work.

So, at the OS level, **“A thread is the smallest unit of execution”**

Think of it this way:

- Program: A set of instructions, such as a web browser.
- Process: A running instance of that program.
- **Thread**: The smallest interruptible unit of instructions being executed within that process.
- CPU: The hardware that executes those instructions.

## Android UI Thread or Main Thread

Android OS works the same as any other Operating system but differs conceptually. When an app is installed, it treats each app as a distinct user of the OS, and when you open the app, the OS creates a new Linux process based on that distinct user and runs the app. Each app runs in its own Linux process with an attached user with its own Isolated memory and permissions. 

When the user launches an app, Android creates a new Linux process along with an execution thread. This **main thread,** also known as the UI thread, is responsible for everything that happens onscreen.

This UI thread, or Main thread, is a **VIP lane** that we should never block. We, as Android developers, have a strict job to manage this thread efficiently while doing all the business of the app.

![Main or UI Thread In Android](images/concurrency-0.png)

### Main UI Thread Rules:

1. Never block the Main or UI thread for more than 5 Seconds
2. UI Updates will only happen via This Main or UI thread

### What if we don’t follow the Rules? Penalties!!!

Both rules are very important; breaking any of them would result in either ANRs, exceptions, silent failures, crashes, and other undefined misbehavior.

### ANRs (Application Not Responding)

In Android, app responsiveness is monitored by the **`ActivityManager`** and **`WindowManager`** system services. Following are the penalties that will be imposed if we break the rules listed above.

Android displays the ANR dialog for an app when it detects one of the following conditions:

- No response to an input event—such as key press or screen tap events—within 5 seconds.
- A **`BroadcastReceiver`** doesn't finish executing within 10 to 20 seconds


![Application Not Responding Dialog](images/anr.dialog.png){width=400 height=300 align=center}

### Threads and UI object references

By design, Android View Objects are not thread-safe, which means two threads can access a UI View Object. By default, there is no such synchronization or thread-locking mechanism at work by the Android OS. 

Well, that's a limitation that we need to take care of as develpoers…!!!

An app is expected to create, use, and destroy UI objects, all on the main thread. If you try to modify or even reference a UI object in a thread other than the main thread, the result can be exceptions, silent failures, crashes, and other undefined misbehavior.


![App Crash Dialog](images/crash-dialog.png){align=center}

## Threads and Activity lifecycles

Android OS is inherently asynchronous. Your app is just one piece of a larger puzzle that the operating system must manage. While your app is running, many things can happen in parallel: an alarm can go off, a phone call can interrupt an important process, the system can terminate your app's process when resources are needed, the user can rotate the device, or change the device's language at any moment. Other apps may also communicate with your app, and vice versa.

As Android developers, we must account for all these possibilities and design our apps to handle interruptions, configuration changes, process termination, and inter-app communication gracefully.

The application lifecycle plays an important role in determining how threading should be managed within an app.

There are some key decisions one should take before working on threads:

1. Whether a thread should persist after the activity is destroyed or not?
2. Is the thread progress in the foreground or Background of the app?
3. What Thread priority is required for a task?

These decisions are crucial for maintaining app responsiveness, managing thread lifecycles effectively, and ensuring efficient memory and system resource utilization.

## Threading Challenges

For example, think about this:

- Consider a case in which an activity spawns a set of threaded work and then is destroyed before a worker thread can finish the work. What should the app do with the work blocks in flight?
- What will happen if the blocks were going to update a UI that no longer exists?
- Imagine you create a new instance of `ThreadedWork` within an Activity, and the user rotates the device three times. This could result in three instances of `ThreadedWork`. How should this scenario be handled?

Every Android device has limited memory resources. To prevent excessive resource usage and maintain overall system stability, the operating system enforces certain process limitations, such as terminating processes or killing memory-intensive tasks that negatively impact the overall user experience.

## Key Takeaways

All the information discussed above highlights that understanding threading in Android requires in-depth knowledge of how the system works under the hood, how the Main or UI thread operates, and the role it plays in application execution. It is equally important to understand the challenges and limitations associated with the Main thread so that developers can anticipate potential issues and address them proactively.

- Never block the Main or UI thread. Ever!!!
- Always take into account the App lifecycle before doing any Threaded block of work.
- Always destroy or cancel the work that is no longer needed.
- UI Updates should only happen via the UI thread.
- Never reference UI/View objects in Threaded work.
- Any work that takes more than 16ms, offload it to a worker thread instead of the Main or UI thread.



It’s all theory…!!! 😴

Sounds boring, right?

No worries! Let’s dive into how Android's Main UI threading machinery work together in [This Post](../handler-looper-message-queue/)🔥