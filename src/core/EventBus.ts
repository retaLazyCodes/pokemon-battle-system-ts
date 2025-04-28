/**
 * EventBus is a class used for managing event-based communication between different parts of the application.
 * It maintains a list of listeners for specific events and allows subscribing, unsubscribing, and emitting events.
 *
 * Methods:
 * - `on(event, listener)`: Subscribes a listener to a specific event.
 * - `off(event, listener)`: Unsubscribes a listener from a specific event.
 * - `emit(event, payload)`: Emits an event with an optional payload to notify all subscribed listeners.
 *
 * Type Parameters:
 * - `T`: The type of the payload associated with the event.
 *
 * Notes:
 * - Listeners can only be unsubscribed if the exact same reference is passed to the `off` method.
 * - This class uses a Map internally to store event names as keys and arrays of listeners as values.
 */

type Listener<T = any> = (payload: T) => void;

export class EventBus {
    private listeners: Map<string, Listener[]> = new Map();

    on<T>(event: string, listener: Listener<T>) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
    }

    off<T>(event: string, listener: Listener<T>) {
        const eventListeners = this.listeners.get(event);
        if (!eventListeners) return;
        this.listeners.set(event, eventListeners.filter(l => l !== listener));
    }

    emit<T>(event: string, payload: T) {
        const eventListeners = this.listeners.get(event);
        if (!eventListeners) return;
        eventListeners.forEach(listener => listener(payload));
    }
}
