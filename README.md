# Synchronization Code Examples

## Table of Contents
1. Dining Philosophers Problem
2. Producer-Consumer Problem
3. Readers-Writers Problem
4. Banker's Algorithm
5. Deadlock Detection and Resolution
6. Page Replacement Algorithms
7. Memory Management Strategies
8. Disk Scheduling Algorithms
9. Scheduling
    
## Complete Code

## synchro 
```
 #include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#define N 5
sem_t forks[N];
sem_t mutex;
void *philosopher(void *num) {
    int id = *(int *)num;
    free(num);
    int left = id;
    int right = (id + 1) % N;
    while (1) {
        sem_wait(&mutex);
        printf("Philosopher %d is thinking.\n", id);
        sem_post(&mutex);
        sleep(1);
        if (id % 2 == 0) {
            sem_wait(&forks[left]);
            sem_wait(&forks[right]);
        } else {
            sem_wait(&forks[right]);
            sem_wait(&forks[left]);
        }
        sem_wait(&mutex);
        printf("Philosopher %d is eating.\n", id);
        sem_post(&mutex);
        sleep(2);
        sem_post(&forks[left]);
        sem_post(&forks[right]);
        sem_wait(&mutex);
        printf("Philosopher %d finished eating.\n", id);
        sem_post(&mutex);
        sleep(1);
    }
    return NULL;
}
int main() {
    pthread_t philosophers[N];
    sem_init(&mutex, 0, 1);
    for (int i = 0; i < N; i++) {
        sem_init(&forks[i], 0, 1);
    }
    for (int i = 0; i < N; i++) {
        int *id = malloc(sizeof(int));
        *id = i;
        pthread_create(&philosophers[i], NULL, philosopher, id);
    }
    for (int i = 0; i < N; i++) {
        pthread_join(philosophers[i], NULL);
    }
    sem_destroy(&mutex);
    for (int i = 0; i < N; i++) {
        sem_destroy(&forks[i]);
    }
    return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#define BUFFER_SIZE 10
int buffer[BUFFER_SIZE];
int in = 0, out = 0;
sem_t empty, full;
pthread_mutex_t mutex;
void *producer(void *arg) {
    for (int i = 0; i < 10; i++) {
        int item = rand() % 100;
        sem_wait(&empty);
        pthread_mutex_lock(&mutex);
        buffer[in] = item;
        printf("Producer produced: %d\n", item);
        in = (in + 1) % BUFFER_SIZE;
        pthread_mutex_unlock(&mutex);
        sem_post(&full);
        sleep(1);
    }
    return NULL;
}
void *consumer(void *arg) {
    for (int i = 0; i < 10; i++) {
        sem_wait(&full);
        pthread_mutex_lock(&mutex);
        int item = buffer[out];
        printf("Consumer consumed: %d\n", item);
        out = (out + 1) % BUFFER_SIZE;
        pthread_mutex_unlock(&mutex);
        sem_post(&empty);
        sleep(1);
    }
    return NULL;
}
int main() {
    pthread_t prod, cons;
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);
    pthread_mutex_init(&mutex, NULL);
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);
    pthread_join(prod, NULL);
    pthread_join(cons, NULL);
    sem_destroy(&empty);
    sem_destroy(&full);
    pthread_mutex_destroy(&mutex);
    return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
sem_t mutex;
sem_t rw_mutex;
int read_count = 0;
int shared_data = 0;
void *reader(void *arg) {
    int id = *(int *)arg;
    free(arg);
    sem_wait(&mutex);
    read_count++;
    if (read_count == 1) {
        sem_wait(&rw_mutex);
    }
    sem_post(&mutex);
    printf("Reader %d reads shared_data: %d\n", id, shared_data);
    sleep(1);
    sem_wait(&mutex);
    read_count--;
    if (read_count == 0) {
        sem_post(&rw_mutex);
    }
    sem_post(&mutex);
    return NULL;
}
void *writer(void *arg) {
    int id = *(int *)arg;
    free(arg);
    sem_wait(&rw_mutex);
    shared_data += 10;
    printf("Writer %d updated shared_data to: %d\n", id, shared_data);
    sleep(1);
    sem_post(&rw_mutex);
    return NULL;
}
int main() {
    pthread_t readers[5], writers[3];
    sem_init(&mutex, 0, 1);
    sem_init(&rw_mutex, 0, 1);
    for (int i = 0; i < 3; i++) {
        int *id = malloc(sizeof(int));
        *id = i + 1;
        pthread_create(&writers[i], NULL, writer, id);
    }
    for (int i = 0; i < 5; i++) {
        int *id = malloc(sizeof(int));
        *id = i + 1;
        pthread_create(&readers[i], NULL, reader, id);
    }
    for (int i = 0; i < 5; i++) {
        pthread_join(readers[i], NULL);
    }
    for (int i = 0; i < 3; i++) {
        pthread_join(writers[i], NULL);
    }
    sem_destroy(&mutex);
    sem_destroy(&rw_mutex);
    return 0;
}
```

## banker
```
#include <stdio.h>
#include <stdbool.h>
#define MAX_PROCESSES 5
#define MAX_RESOURCES 3
int available[MAX_RESOURCES];
int max[MAX_PROCESSES][MAX_RESOURCES];
int allocation[MAX_PROCESSES][MAX_RESOURCES];
int need[MAX_PROCESSES][MAX_RESOURCES];
int safeSequence[MAX_PROCESSES];
int n, m;
void calculateNeed() {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            need[i][j] = max[i][j] - allocation[i][j];
        }
    }
}
bool isSafeState() {
    int work[MAX_RESOURCES];
    bool finish[MAX_PROCESSES] = {false};
    for (int i = 0; i < m; i++) {
        work[i] = available[i];
    }
    int count = 0; 
    while (count < n) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                bool canAllocate = true;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) {
                        canAllocate = false;
                        break;
                    }
                }
                if (canAllocate) {
                    for (int j = 0; j < m; j++) {
                        work[j] += allocation[i][j];
                    }
                    finish[i] = true;
                    safeSequence[count++] = i;
                    found = true;
                }
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}
bool requestResources(int process, int request[]) {
    for (int i = 0; i < m; i++) {
        if (request[i] > need[process][i]) {
            printf("Error: Process P%d has exceeded its maximum claim.\n", process);
            return false;
        }
        if (request[i] > available[i]) {
            printf("Process P%d must wait, resources not available.\n", process);
            return false;
        }
    }
    for (int i = 0; i < m; i++) {
        available[i] -= request[i];
        allocation[process][i] += request[i];
        need[process][i] -= request[i];
    }
    if (isSafeState()) {
        printf("Resources allocated successfully.\n");
        return true;
    } else {
        printf("Unsafe state detected! Rolling back allocation.\n");
        for (int i = 0; i < m; i++) {
            available[i] += request[i];
            allocation[process][i] -= request[i];
            need[process][i] += request[i];
        }
        return false;
    }
}
void printState() {
    printf("\nCurrent State:\n");
    printf("Available Resources: ");
    for (int i = 0; i < m; i++) {
        printf("%d ", available[i]);
    }
    printf("\n\nAllocation Matrix:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            printf("%d ", allocation[i][j]);
        }
        printf("\n");
    }
    printf("\nNeed Matrix:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            printf("%d ", need[i][j]);
        }
        printf("\n");
    }
}
int main() {
    printf("Enter number of processes and resources: ");
    scanf("%d %d", &n, &m);
    printf("Enter available resources: ");
    for (int i = 0; i < m; i++) {
        scanf("%d", &available[i]);
    }
    printf("Enter Max matrix: \n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &max[i][j]);
        }
    }
    printf("Enter Allocation matrix: \n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &allocation[i][j]);
        }
    }
    calculateNeed();
    printState();
    if (isSafeState()) {
        printf("System is in a safe state.\nSafe Sequence: ");
        for (int i = 0; i < n; i++) {
            printf("P%d ", safeSequence[i]);
        }
        printf("\n");
    } else {
        printf("System is in an unsafe state!\n");
    }
    int process, request[MAX_RESOURCES];
    printf("Enter process number (0-%d): ", n-1);
    scanf("%d", &process);
    printf("Enter request vector: ");
    for (int i = 0; i < m; i++) {
        scanf("%d", &request[i]);
    }
    requestResources(process, request);
    return 0;
}
```
## deadlock
```
#include <stdio.h>
#include <stdbool.h>
#define MAX_PROCESSES 10
#define MAX_RESOURCES 10
bool isSafeState(int n, int m, int allocation[][MAX_RESOURCES], int need[][MAX_RESOURCES], int available[], int safeSequence[])
{
    bool finished[MAX_PROCESSES] = {false};
    int work[MAX_RESOURCES];
    for (int j = 0; j < m; j++)
    {
        work[j] = available[j];
    }
    int count = 0;
    while (count < n)
    {
        bool found = false;
        for (int i = 0; i < n; i++)
        {
            if (!finished[i])
            {
                int j;
                for (j = 0; j < m; j++)
                {
                    if (need[i][j] > work[j])
                        break;
                }
                if (j == m)
                {
                    for (int k = 0; k < m; k++)
                    {
                        work[k] += allocation[i][k];
                    }
                    safeSequence[count++] = i;
                    finished[i] = true;
                    found = true;
                }
            }
        }
        if (!found)
        {
            break;
        }
    }
    return (count == n);
}
bool changeInRequestResources(int n, int m, int process, int request[],
                      int allocation[][MAX_RESOURCES], 
                      int available[], int need[][MAX_RESOURCES])
{   
    int temp[MAX_RESOURCES];
    for (int j = 0; j < m; j++)
    {
        temp[j] = need[process][j];
    }    
    for (int j = 0; j < m; j++)
    {
        need[process][j] = request[j];
    }
    int safeSequence[MAX_PROCESSES];
    if (isSafeState(n, m, allocation, need, available, safeSequence))
    {
        printf("The process safe sequence is:\n");
        for(int i  = 0; i<n;i++){
            printf("%d ",safeSequence[i]);
        }
        printf("\n");
        return true;
    }
    else
    {
        for (int j = 0; j < m; j++)
        {
            need[process][j] = temp[j];
        }
        return false;
    }
}
int main()
{
    int n, m;
    printf("Enter the number of processes: ");
    scanf("%d", &n);
    printf("Enter the number of resource types: ");
    scanf("%d", &m);
    int allocation[MAX_PROCESSES][MAX_RESOURCES];
    int available[MAX_RESOURCES];
    int need[MAX_PROCESSES][MAX_RESOURCES];
    printf("\nEnter the allocation matrix:\n");
    for (int i = 0; i < n; i++)
    {
        printf("For process %d, enter %d allocated resources: ", i, m);
        for (int j = 0; j < m; j++)
        {
            scanf("%d", &allocation[i][j]);
        }
    }
    printf("\nEnter the request matrix:\n");
    for (int i = 0; i < n; i++)
    {
        printf("For process %d, enter %d requested resources: ", i, m);
        for (int j = 0; j < m; j++)
        {
            scanf("%d", &need[i][j]);
        }
    }
    printf("\nEnter the available resources: ");
    for (int j = 0; j < m; j++)
    {
        scanf("%d", &available[j]);
    }   
    int safeSequence[MAX_PROCESSES];
    if (isSafeState(n, m, allocation, need, available, safeSequence))
    {
        printf("\nNo deadlock.\nSafe sequence is: ");
        for (int i = 0; i < n; i++)
        {
            printf("P%d ", safeSequence[i]);
        }
        printf("\n");
    }
    else
    {
        printf("\nDeadlock detected.\n");
    }
    char choice;
    printf("\nDo you want to change the request vector for a process? (y/n): ");
    scanf(" %c", &choice);
    if (choice == 'y' || choice == 'Y')
    {
        int process;
        printf("Enter the process number making the request: ");
        scanf("%d", &process);
        int request[MAX_RESOURCES];
        printf("Enter the new request vector for process %d: ", process);
        for (int j = 0; j < m; j++)
        {
            scanf("%d", &request[j]);
        }
        if (changeInRequestResources(n, m, process, request, allocation, available, need))
        {
            printf("No deadlock\n");
        }
        else
        {
            printf("Deadlock Detected\n");
        }
    }
    return 0;
}
```
# page
```
#include <stdio.h>
#include <limits.h>
void fifo(int pages[], int n, int capacity) {
    int frame[capacity], front = 0, count = 0, faults = 0;
    for (int i = 0; i < capacity; i++) frame[i] = -1;
    for (int i = 0; i < n; i++) {
        int found = 0;
        for (int j = 0; j < capacity; j++) {
            if (frame[j] == pages[i]) {
                found = 1;
                break;
            }
        }
        if (!found) {
            frame[front] = pages[i];
            front = (front + 1) % capacity;
            faults++;
        }
    }
    printf("FIFO Page Faults: %d\n", faults);
}
void lru(int pages[], int n, int capacity) {
    int frame[capacity], time[capacity], faults = 0, count = 0;
    for (int i = 0; i < capacity; i++) frame[i] = -1;
    for (int i = 0; i < n; i++) {
        int found = 0, least = 0;
        for (int j = 0; j < capacity; j++) {
            if (frame[j] == pages[i]) {
                found = 1;
                time[j] = ++count;
                break;
            }
        }
        if (!found) {
            for (int j = 1; j < capacity; j++) {
                if (time[j] < time[least]) least = j;
            }
            frame[least] = pages[i];
            time[least] = ++count;
            faults++;
        }
    }
    printf("LRU Page Faults: %d\n", faults);
}
void optimal(int pages[], int n, int capacity) {
    int frame[capacity], faults = 0;
    for (int i = 0; i < capacity; i++) frame[i] = -1;
    for (int i = 0; i < n; i++) {
        int found = 0, replace = -1, farthest = i;
        for (int j = 0; j < capacity; j++) {
            if (frame[j] == pages[i]) {
                found = 1;
                break;
            }
        }
        if (!found) {
            for (int j = 0; j < capacity; j++) {
                int k;
                for (k = i + 1; k < n; k++) {
                    if (frame[j] == pages[k]) break;
                }
                if (k > farthest) {
                    farthest = k;
                    replace = j;
                }
            }
            if (replace == -1) replace = 0;
            frame[replace] = pages[i];
            faults++;
        }
    }
    printf("Optimal Page Faults: %d\n", faults);
}
void second_chance(int pages[], int n, int capacity) {
    int frame[capacity], reference[capacity], front = 0, faults = 0;
    for (int i = 0; i < capacity; i++) {
        frame[i] = -1;
        reference[i] = 0;
    }
    for (int i = 0; i < n; i++) {
        int found = 0;
        for (int j = 0; j < capacity; j++) {
            if (frame[j] == pages[i]) {
                reference[j] = 1;
                found = 1;
                break;
            }
        }
        if (!found) {
            while (reference[front] == 1) {
                reference[front] = 0;
                front = (front + 1) % capacity;
            }
            frame[front] = pages[i];
            reference[front] = 1;
            front = (front + 1) % capacity;
            faults++;
        }
    }
    printf("Second Chance Page Faults: %d\n", faults);
}
int main() {
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int n = sizeof(pages) / sizeof(pages[0]);
    int capacity = 3;
    fifo(pages, n, capacity);
    lru(pages, n, capacity);
    optimal(pages, n, capacity);
    second_chance(pages, n, capacity);
    return 0;
}

//---------- MEMORY MANAGEMENT STRATEGIES ----------
#include <stdio.h>
#include <stdbool.h>
void firstFit(int bl[], int npr, int pr[], int nb) {
    int allocated[nb];
    bool finished[npr];
    for (int i = 0; i < nb; i++)
        allocated[i] = -1;
    for (int i = 0; i < npr; i++)
        finished[i] = false;
    for (int i = 0; i < nb; i++) {
        for (int j = 0; j < npr; j++) {
            if (!finished[j] && bl[j] >= pr[i]) {
                allocated[i] = j;
                finished[j] = true;
                break;
            }
        }
    }
    printf("\n");
    printf("First Fit Allocation:\n");
    for (int i = 0; i < nb; i++) {
        if (allocated[i] != -1)
            printf("Process %d -> Block %d\n", i + 1, allocated[i] + 1);
        else
            printf("Process %d -> Can't allocate\n", i + 1);
    }
}
void nextFit(int bl[], int npr, int pr[], int nb) {
    int allocated[nb];
    bool finished[npr];
    for (int i = 0; i < nb; i++)
        allocated[i] = -1;
    for (int i = 0; i < npr; i++)
        finished[i] = false;
    int lastAllocated = 0;
    for (int i = 0; i < nb; i++) {
        for (int j = lastAllocated; j < npr; j++) {
            if (!finished[j] && bl[j] >= pr[i]) {
                allocated[i] = j;
                finished[j] = true;
                lastAllocated = j;
                break;
            }
        }
    }
    printf("\n");
    printf("Next Fit Allocation:\n");
    for (int i = 0; i < nb; i++) {
        if (allocated[i] != -1)
            printf("Process %d -> Block %d\n", i + 1, allocated[i] + 1);
        else
            printf("Process %d -> Can't allocate\n", i + 1);
    }
}
void bestFit(int bl[], int npr, int pr[], int nb) {
    int allocated[nb]; 
    bool finished[npr];
    for (int i = 0; i < nb; i++)
        allocated[i] = -1;
    for (int i = 0; i < npr; i++)
        finished[i] = false;
    for (int i = 0; i < nb; i++) {
        int possibleBlocks[npr], count = 0;
        for (int j = 0; j < npr; j++) {
            if (!finished[j] && bl[j] >= pr[i]) {
                possibleBlocks[count++] = j;
            }
        }
        if (count > 0) {
            int bestIdx = possibleBlocks[0];
            for (int k = 1; k < count; k++) {
                if (bl[possibleBlocks[k]] < bl[bestIdx]) {
                    bestIdx = possibleBlocks[k];
                }
            }
            allocated[i] = bestIdx;
            finished[bestIdx] = true;
        }
    }
    printf("\n");
    printf("Best Fit Allocation:\n");
    for (int i = 0; i < nb; i++) {
        if (allocated[i] != -1)
            printf("Process %d -> Block %d\n", i + 1, allocated[i] + 1);
        else
            printf("Process %d -> Can't allocate\n", i + 1);
    }
}
void worstFit(int bl[], int npr, int pr[], int nb) {
    int allocated[nb]; 
    bool finished[npr];
    for (int i = 0; i < nb; i++)
        allocated[i] = -1;
    for (int i = 0; i < npr; i++)
        finished[i] = false;
    for (int i = 0; i < nb; i++) {
        int possibleBlocks[npr], count = 0;
        for (int j = 0; j < npr; j++) {
            if (!finished[j] && bl[j] >= pr[i]) {
                possibleBlocks[count++] = j;
            }
        }
        if (count > 0) {
            int worstIdx = possibleBlocks[0];
            for (int k = 1; k < count; k++) {
                if (bl[possibleBlocks[k]] > bl[worstIdx]) {
                    worstIdx = possibleBlocks[k];
                }
            }
            allocated[i] = worstIdx;
            finished[worstIdx] = true;
        }
    }
    printf("\n");
    printf("Worst Fit Allocation:\n");
    for (int i = 0; i < nb; i++) {
        if (allocated[i] != -1)
            printf("Process %d -> Block %d\n", i + 1, allocated[i] + 1);
        else
            printf("Process %d -> Can't allocate\n", i + 1);
    }
}
int main() {
    int nb, npr;
    printf("Enter number of processes: ");
    scanf("%d", &nb);
    int pr[nb];
    printf("Enter sizes of processes: ");
    for (int i = 0; i < nb; i++)
        scanf("%d", &pr[i]);
    printf("Enter number of blocks: ");
    scanf("%d", &npr);
    int bl[npr];
    printf("Enter sizes of blocks: ");
    for (int i = 0; i < npr; i++)
        scanf("%d", &bl[i]);
    firstFit(bl, npr, pr, nb);
    nextFit(bl, npr, pr, nb);
    bestFit(bl, npr, pr, nb);
    worstFit(bl, npr, pr, nb);
    return 0;
}
```
## disk
```
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void fcfs(int req[], int n, int head) {
    int seek = 0;
    printf("\nFCFS Order: %d", head);
    for (int i = 0; i < n; i++) {
        seek += abs(req[i] - head);
        head = req[i];
        printf(" -> %d", head);
    }
    printf("\nTotal Seek Time = %d\n", seek);
}

void sstf(int req[], int n, int head) {
    int seek = 0, visited[100] = {0}, done = 0;
    printf("\nSSTF Order: %d", head);
    while (done < n) {
        int min = 1e9, index = -1;
        for (int i = 0; i < n; i++) {
            if (!visited[i] && abs(req[i] - head) < min) {
                min = abs(req[i] - head);
                index = i;
            }
        }
        seek += abs(req[index] - head);
        head = req[index];
        visited[index] = 1;
        printf(" -> %d", head);
        done++;
    }
    printf("\nTotal Seek Time = %d\n", seek);
}

void scan(int req[], int n, int head, int disk_size) {
    int seek = 0;
    int temp[100], size = 0;
    
    for (int i = 0; i < n; i++)
        temp[i] = req[i];
    temp[n++] = head;
    
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (temp[j] > temp[j + 1]) {
                int t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }

    int pos;
    for (int i = 0; i < n; i++)
        if (temp[i] == head) {
            pos = i;
            break;
        }

    printf("\nSCAN Order: ");
    for (int i = pos; i >= 0; i--) {
        printf("%d ", temp[i]);
        if (i > 0) seek += abs(temp[i] - temp[i - 1]);
    }
    seek += temp[0]; 
    printf("0 ");
    for (int i = pos + 1; i < n; i++) {
        seek += abs(temp[i] - temp[i - 1]);
        printf("%d ", temp[i]);
    }

    printf("\nTotal Seek Time = %d\n", seek);
}

void cscan(int req[], int n, int head, int disk_size) {
    int seek = 0;
    int temp[100], size = 0;

    for (int i = 0; i < n; i++)
        temp[i] = req[i];
    temp[n++] = head;

    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (temp[j] > temp[j + 1]) {
                int t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }

    int pos;
    for (int i = 0; i < n; i++)
        if (temp[i] == head) {
            pos = i;
            break;
        }

    printf("\nC-SCAN Order: ");
    for (int i = pos; i < n; i++) {
        printf("%d ", temp[i]);
        if (i < n - 1) seek += abs(temp[i] - temp[i + 1]);
    }
    if (temp[n - 1] != disk_size - 1) {
        seek += abs(disk_size - 1 - temp[n - 1]);
        printf("%d ", disk_size - 1);
    }
    seek += disk_size - 1; // jump to 0
    printf("0 ");
    for (int i = 0; i < pos; i++) {
        printf("%d ", temp[i]);
        if (i < pos - 1) seek += abs(temp[i] - temp[i + 1]);
    }

    printf("\nTotal Seek Time = %d\n", seek);
}

void look(int req[], int n, int head) {
    int seek = 0;
    int temp[100];

    for (int i = 0; i < n; i++)
        temp[i] = req[i];
    temp[n++] = head;

    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (temp[j] > temp[j + 1]) {
                int t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }

    int pos;
    for (int i = 0; i < n; i++)
        if (temp[i] == head) {
            pos = i;
            break;
        }

    printf("\nLOOK Order: ");
    for (int i = pos; i >= 0; i--) {
        printf("%d ", temp[i]);
        if (i > 0) seek += abs(temp[i] - temp[i - 1]);
    }
    for (int i = pos + 1; i < n; i++) {
        printf("%d ", temp[i]);
        if (i < n - 1) seek += abs(temp[i] - temp[i + 1]);
    }

    printf("\nTotal Seek Time = %d\n", seek);
}

void clook(int req[], int n, int head) {
    int seek = 0;
    int temp[100];

    for (int i = 0; i < n; i++)
        temp[i] = req[i];
    temp[n++] = head;

    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (temp[j] > temp[j + 1]) {
                int t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }

    int pos;
    for (int i = 0; i < n; i++)
        if (temp[i] == head) {
            pos = i;
            break;
        }

    printf("\nC-LOOK Order: ");
    for (int i = pos; i < n; i++) {
        printf("%d ", temp[i]);
        if (i < n - 1) seek += abs(temp[i] - temp[i + 1]);
    }
    if (pos > 0) {
        seek += abs(temp[n - 1] - temp[0]);
        for (int i = 0; i < pos; i++) {
            printf("%d ", temp[i]);
            if (i < pos - 1) seek += abs(temp[i] - temp[i + 1]);
        }
    }

    printf("\nTotal Seek Time = %d\n", seek);
}

int main() {
    int requests[100], n, head, disk_size;

    printf("Enter number of requests: ");
    scanf("%d", &n);

    printf("Enter the request sequence:\n");
    for (int i = 0; i < n; i++)
        scanf("%d", &requests[i]);

    printf("Enter initial head position: ");
    scanf("%d", &head);

    printf("Enter total disk size: ");
    scanf("%d", &disk_size);

    fcfs(requests, n, head);
    sstf(requests, n, head);
    scan(requests, n, head, disk_size);
    cscan(requests, n, head, disk_size);
    look(requests, n, head);
    clook(requests, n, head);

    return 0;
}
```
## scheduling
```
#include <stdio.h>

struct Process {
  int pid, arrival_time, burst_time, start_time, completion_time, waiting_time,
      turnaround_time;
};

void sortByArrival(struct Process p[], int n) {
  struct Process temp;
  for (int i = 0; i < n - 1; i++) {
    for (int j = i + 1; j < n; j++) {
      if (p[i].arrival_time > p[j].arrival_time) {
        temp = p[i];
        p[i] = p[j];
        p[j] = temp;
      }
    }
  }
}

void calculateTimes(struct Process p[], int n) {
  int current_time = 0;

  for (int i = 0; i < n; i++) {
    p[i].start_time =
        (current_time > p[i].arrival_time) ? current_time : p[i].arrival_time;
    p[i].completion_time = p[i].start_time + p[i].burst_time;
    p[i].waiting_time = p[i].start_time - p[i].arrival_time;
    p[i].turnaround_time = p[i].completion_time - p[i].arrival_time;

    current_time = p[i].completion_time;
  }
}

void printProcesses(struct Process p[], int n) {
  printf("\nPID\tAT\tBT\tST\tCT\tWT\tTT\n");
  for (int i = 0; i < n; i++) {
    printf("%d\t%d\t%d\t%d\t%d\t%d\t%d\n", p[i].pid, p[i].arrival_time,
           p[i].burst_time, p[i].start_time, p[i].completion_time,
           p[i].waiting_time, p[i].turnaround_time);
  }
}

void printGanttChart(struct Process p[], int n) {
  printf("\nGantt Chart:\n");

  printf(" ");
  for (int i = 0; i < n; i++)
    printf("----");
  printf("\n|");

  for (int i = 0; i < n; i++)
    printf(" P%d |", p[i].pid);
  printf("\n ");

  for (int i = 0; i < n; i++)
    printf("----");
  printf("\n");

  printf("0");
  for (int i = 0; i < n; i++)
    printf("   %d", p[i].completion_time);
  printf("\n");
}

int main() {
  int n;

  printf("Enter number of processes: ");
  scanf("%d", &n);

  struct Process p[n];

  for (int i = 0; i < n; i++) {
    p[i].pid = i + 1;
    printf("Enter Arrival Time and Burst Time for Process %d: ", p[i].pid);
    scanf("%d %d", &p[i].arrival_time, &p[i].burst_time);
  }

  sortByArrival(p, n);
  calculateTimes(p, n);
  printProcesses(p, n);
  printGanttChart(p, n);

  float avg_wt = 0, avg_tat = 0;
  for (int i = 0; i < n; i++) {
    avg_wt += p[i].waiting_time;
    avg_tat += p[i].turnaround_time;
  }

  printf("\nAverage Waiting Time: %.2f", avg_wt / n);
  printf("\nAverage Turnaround Time: %.2f\n", avg_tat / n);

  return 0;
}

--------------------------- Scheduling (priority - Non premetive )-----------------------
#include <stdio.h>

struct Process {
    int pid;        
    int at;         
    int bt;        
    int priority;   
    int wt;        
    int tat;        
};

void sortProcesses(struct Process p[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (p[i].at > p[j].at || (p[i].at == p[j].at && p[i].priority > p[j].priority)) {
                struct Process temp = p[i];
                p[i] = p[j];
                p[j] = temp;
            }
        }
    }
}

void calculateTimes(struct Process p[], int n) {
    int completion_time = 0;
    p[0].wt = 0; 
    for (int i = 0; i < n; i++) {
        if (completion_time < p[i].at) {
            completion_time = p[i].at; // CPU idle time adjustment
        }
        p[i].wt = completion_time - p[i].at;
        completion_time += p[i].bt;
        p[i].tat = p[i].wt + p[i].bt;
    }
}

void printProcesses(struct Process p[], int n) {
    printf("\nProcess Details:\n");
    printf("PID\tAT\tBT\tPriority\tWT\tTAT\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%d\t%d\t%d\t\t%d\t%d\n", p[i].pid, p[i].at, p[i].bt, p[i].priority, p[i].wt, p[i].tat);
    }
}

void printGanttChart(struct Process p[], int n) {
    printf("\nGantt Chart:\n");

    printf(" ");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p[i].bt; j++) printf("--");
        printf(" ");
    }
    printf("\n|");

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p[i].bt - 1; j++) printf(" ");
        printf("P%d", p[i].pid);
        for (int j = 0; j < p[i].bt - 1; j++) printf(" ");
        printf("|");
    }

    printf("\n ");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p[i].bt; j++) printf("--");
        printf(" ");
    }
    printf("\n0");

    int time = 0;
    for (int i = 0; i < n; i++) {
        time += p[i].bt;
        printf("%*d", p[i].bt * 2, time);
    }
    printf("\n");
}

int main() {
    int n;

    printf("Enter the number of processes: ");
    scanf("%d", &n);

    struct Process p[n];

    for (int i = 0; i < n; i++) {
        printf("Enter Arrival Time, Burst Time and Priority for Process %d: ", i + 1);
        scanf("%d %d %d", &p[i].at, &p[i].bt, &p[i].priority);
        p[i].pid = i + 1;
    }

    sortProcesses(p, n);
    calculateTimes(p, n);
    printProcesses(p, n);
    printGanttChart(p, n);

    return 0;
}

------------------------ Priority (Premetive) ---------------------------
#include <stdio.h>
#include <limits.h>

struct Process {
    int pid;        
    int at;         
    int bt;         
    int priority;   
    int remaining;  
    int wt;        
    int tat;       
};

int findHighestPriority(struct Process p[], int n, int time) {
    int minPriority = INT_MAX, index = -1;
    for (int i = 0; i < n; i++) {
        if (p[i].at <= time && p[i].remaining > 0) {  // not yet completed
            if (p[i].priority < minPriority) { 
                minPriority = p[i].priority;
                index = i;
            }
        }
    }
    return index;
}

void calculateTimes(struct Process p[], int n) {
    int completed = 0, time = 0;
    int lastCompletionTime[n];

    while (completed < n) {
        int idx = findHighestPriority(p, n, time);
        
        if (idx == -1) {      
            time++;
            continue;
        }

        p[idx].remaining--; 
        lastCompletionTime[idx] = time + 1; 
        
        if (p[idx].remaining == 0) {  
            completed++;
            p[idx].tat = lastCompletionTime[idx] - p[idx].at;
            p[idx].wt = p[idx].tat - p[idx].bt;
        }
        
        time++;
    }
}

void printProcesses(struct Process p[], int n) {
    printf("\nProcess Details:\n");
    printf("PID\tAT\tBT\tPriority\tWT\tTAT\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%d\t%d\t%d\t\t%d\t%d\n", p[i].pid, p[i].at, p[i].bt, p[i].priority, p[i].wt, p[i].tat);
    }
}

void printGanttChart(struct Process p[], int n) {
    int time = 0, completed = 0;
    
    printf("\nGantt Chart:\n");
    printf(" ");

    while (completed < n) {
        int idx = findHighestPriority(p, n, time);

        if (idx == -1) { 
            time++;
            continue;
        }

        printf(" P%d ", p[idx].pid);
        p[idx].remaining--;

        if (p[idx].remaining == 0) {
            completed++;
        }
        
        time++;
    }

    printf("\n");
    
    time = 0;
    completed = 0;
    printf("0");
    while (completed < n) {
        int idx = findHighestPriority(p, n, time);

        if (idx == -1) { 
            time++;
            continue;
        }

        printf("   %d", time + 1);
        p[idx].remaining--;

        if (p[idx].remaining == 0) {
            completed++;
        }

        time++;
    }

    printf("\n");
}

int main() {
    int n;

    printf("Enter the number of processes: ");
    scanf("%d", &n);

    struct Process p[n];

    for (int i = 0; i < n; i++) {
        printf("Enter Arrival Time, Burst Time and Priority for Process %d: ", i + 1);
        scanf("%d %d %d", &p[i].at, &p[i].bt, &p[i].priority);
        p[i].pid = i + 1;
        p[i].remaining = p[i].bt;
    }

    calculateTimes(p, n);
    printProcesses(p, n);
    printGanttChart(p, n);

    return 0;
}

----------------------- Round Robin ----------------------

#include <stdio.h>

#define MAX_PROCESSES 100

void roundRobin(int n, int burst_time[], int quantum) {
    int remaining_time[MAX_PROCESSES];
    int waiting_time[MAX_PROCESSES] = {0};
    int turnaround_time[MAX_PROCESSES] = {0};
    int total_waiting_time = 0, total_turnaround_time = 0;

    for (int i = 0; i < n; i++) {
        remaining_time[i] = burst_time[i];
    }
    int time = 0;
    int done;
    int gantt_process[MAX_PROCESSES * 10];
    int gantt_time[MAX_PROCESSES * 10];
    int gantt_index = 0;

    do {
        done = 1;
        for (int i = 0; i < n; i++) {
            if (remaining_time[i] > 0) {
                done = 0;
                gantt_process[gantt_index] = i + 1;
                gantt_time[gantt_index] = time;
                gantt_index++;

                if (remaining_time[i] > quantum) {
                    time += quantum;
                    remaining_time[i] -= quantum;
                } else {
                    time += remaining_time[i];
                    waiting_time[i] = time - burst_time[i];
                    remaining_time[i] = 0;
                }
            }
        }
    } while (!done);
    gantt_time[gantt_index] = time;

    for (int i = 0; i < n; i++) {
        turnaround_time[i] = burst_time[i] + waiting_time[i];
        total_waiting_time += waiting_time[i];
        total_turnaround_time += turnaround_time[i];
    }

    printf("\nProcess\tBurst Time\tWaiting Time\tTurnaround Time\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%d\t\t%d\t\t%d\n", i + 1, burst_time[i], waiting_time[i], turnaround_time[i]);
    }
    printf("\nAverage Waiting Time: %.2f\n", (float)total_waiting_time / n);
    printf("Average Turnaround Time: %.2f\n", (float)total_turnaround_time / n);

    printf("\nGantt Chart:\n");
    for (int i = 0; i < gantt_index; i++) {
        printf("| P%d ", gantt_process[i]);
    }
    printf("|\n");

    for (int i = 0; i <= gantt_index; i++) {
        printf("%d    ", gantt_time[i]);
    }
    printf("\n");
}

int main() {
    int n, quantum;
    int burst_time[MAX_PROCESSES];

    printf("Enter number of processes: ");
    scanf("%d", &n);

    printf("Enter burst times for each process:\n");
    for (int i = 0; i < n; i++) {
        printf("%d :", i + 1);
        scanf("%d", &burst_time[i]);
    }

    printf("Enter time quantum: ");
    scanf("%d", &quantum);

    roundRobin(n, burst_time, quantum);

    return 0;
}

----------------------- SJF Non Premetive ----------------------
#include <stdio.h>

#define MAX_PROCESSES 100

void roundRobin(int n, int burst_time[], int quantum) {
    int remaining_time[MAX_PROCESSES];
    int waiting_time[MAX_PROCESSES] = {0};
    int turnaround_time[MAX_PROCESSES] = {0};
    int total_waiting_time = 0, total_turnaround_time = 0;

    for (int i = 0; i < n; i++) {
        remaining_time[i] = burst_time[i];
    }
    int time = 0;
    int done;
    int gantt_process[MAX_PROCESSES * 10];
    int gantt_time[MAX_PROCESSES * 10];
    int gantt_index = 0;

    do {
        done = 1;
        for (int i = 0; i < n; i++) {
            if (remaining_time[i] > 0) {
                done = 0;
                gantt_process[gantt_index] = i + 1;
                gantt_time[gantt_index] = time;
                gantt_index++;

                if (remaining_time[i] > quantum) {
                    time += quantum;
                    remaining_time[i] -= quantum;
                } else {
                    time += remaining_time[i];
                    waiting_time[i] = time - burst_time[i];
                    remaining_time[i] = 0;
                }
            }
        }
    } while (!done);
    gantt_time[gantt_index] = time;

    for (int i = 0; i < n; i++) {
        turnaround_time[i] = burst_time[i] + waiting_time[i];
        total_waiting_time += waiting_time[i];
        total_turnaround_time += turnaround_time[i];
    }

    printf("\nProcess\tBurst Time\tWaiting Time\tTurnaround Time\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%d\t\t%d\t\t%d\n", i + 1, burst_time[i], waiting_time[i], turnaround_time[i]);
    }
    printf("\nAverage Waiting Time: %.2f\n", (float)total_waiting_time / n);
    printf("Average Turnaround Time: %.2f\n", (float)total_turnaround_time / n);

    printf("\nGantt Chart:\n");
    for (int i = 0; i < gantt_index; i++) {
        printf("| P%d ", gantt_process[i]);
    }
    printf("|\n");

    for (int i = 0; i <= gantt_index; i++) {
        printf("%d    ", gantt_time[i]);
    }
    printf("\n");
}

int main() {
    int n, quantum;
    int burst_time[MAX_PROCESSES];

    printf("Enter number of processes: ");
    scanf("%d", &n);

    printf("Enter burst times for each process:\n");
    for (int i = 0; i < n; i++) {
        printf("%d :", i + 1);
        scanf("%d", &burst_time[i]);
    }

    printf("Enter time quantum: ");
    scanf("%d", &quantum);

    roundRobin(n, burst_time, quantum);

    return 0;
}

---------------------- SRTF Premetive -------------------

#include <stdio.h>
#include <limits.h>

struct Process {
    int pid;
    int arrival_time;
    int burst_time;
    int remaining_time;
    int start_time;
    int completion_time;
    int turnaround_time;
    int waiting_time;
    int is_completed;
};

void printProcesses(struct Process p[], int n) {
    printf("\nPID\tAT\tBT\tST\tCT\tWT\tTAT\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%d\t%d\t%d\t%d\t%d\t%d\n", p[i].pid, p[i].arrival_time,
               p[i].burst_time, p[i].start_time, p[i].completion_time,
               p[i].waiting_time, p[i].turnaround_time);
    }
}

void printGanttChart(int timeline[], int time) {
    printf("\nGantt Chart:\n ");
    for (int i = 0; i < time; i++) {
        if (i == 0 || timeline[i] != timeline[i - 1])
            printf("P%d ", timeline[i]);
    }
    printf("\n");
}

int main() {
    int n;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    struct Process p[n];
    int is_started[n];

    for (int i = 0; i < n; i++) {
        p[i].pid = i + 1;
        printf("Enter Arrival Time and Burst Time for Process %d: ", p[i].pid);
        scanf("%d %d", &p[i].arrival_time, &p[i].burst_time);
        p[i].remaining_time = p[i].burst_time;
        p[i].is_completed = 0;
        is_started[i] = 0;
    }

    int completed = 0, current_time = 0, timeline[1000], t = 0;
    float total_wt = 0, total_tat = 0;

    while (completed != n) {
        int idx = -1;
        int min_remaining = INT_MAX;

        for (int i = 0; i < n; i++) {
            if (p[i].arrival_time <= current_time &&
                p[i].is_completed == 0 &&
                p[i].remaining_time < min_remaining &&
                p[i].remaining_time > 0) {
                min_remaining = p[i].remaining_time;
                idx = i;
            }
        }

        if (idx != -1) {
            if (is_started[idx] == 0) {
                p[idx].start_time = current_time;
                is_started[idx] = 1;
            }

            p[idx].remaining_time--;
            timeline[t++] = p[idx].pid;
            current_time++;

            if (p[idx].remaining_time == 0) {
                p[idx].completion_time = current_time;
                p[idx].turnaround_time = p[idx].completion_time - p[idx].arrival_time;
                p[idx].waiting_time = p[idx].turnaround_time - p[idx].burst_time;
                total_wt += p[idx].waiting_time;
                total_tat += p[idx].turnaround_time;
                p[idx].is_completed = 1;
                completed++;
            }
        } else {
            // No process is ready, so CPU is idle
            timeline[t++] = 0;  // Represent idle with PID 0
            current_time++;
        }
    }

    printProcesses(p, n);
    printGanttChart(timeline, t);

    printf("\nAverage Waiting Time: %.2f", total_wt / n);
    printf("\nAverage Turnaround Time: %.2f\n", total_tat / n);

    return 0;
}
```

## shell

```
--------------- string operations -----------------------
#!/bin/bash

# Input string
echo "Enter a string:"
read str

# 1. String Length
echo "Length of string: ${#str}"

# 2. Substring Extraction
echo "Substring from index 2 to 5: ${str:2:4}"

# 3. String Concatenation
str2="BashScripting"
concat="$str$str2"
echo "Concatenated string: $concat"

# 4. Replace substring
replaced="${str/Shell/Bash}"
echo "After replacement (Shell -> Bash): $replaced"

# 5. Convert to Uppercase
upper=$(echo "$str" | tr '[:lower:]' '[:upper:]')
echo "Uppercase: $upper"

# 6. Convert to Lowercase
lower=$(echo "$str" | tr '[:upper:]' '[:lower:]')
echo "Lowercase: $lower"

# 7. Check if string is empty
if [ -z "$str" ]; then
    echo "String is empty"
else
    echo "String is not empty"
fi

# 8. Reverse a string
reverse=$(echo "$str" | rev)
echo "Reversed string: $reverse"

# 9. Check if substring exists
if [[ "$str" == *"script"* ]]; then
    echo "Substring 'script' found"
else
    echo "Substring 'script' not found"
fi

# 10. Compare two strings
echo "Enter another string to compare:"
read str3
if [ "$str" == "$str3" ]; then
    echo "Strings are equal"
else
    echo "Strings are not equal"
fi

-------------------- problem 2 : arithmetic ----------------------

#!/bin/bash

# Input marks for 5 subjects
echo "Enter marks for 5 subjects out of 100:"
read -p "Subject 1: " s1
read -p "Subject 2: " s2
read -p "Subject 3: " s3
read -p "Subject 4: " s4
read -p "Subject 5: " s5

# Arithmetic Operations
total=$((s1 + s2 + s3 + s4 + s5))
average=$((total / 5))

# Display total and average
echo "Total Marks: $total"
echo "Average Marks: $average"

# Grading System
if [ $average -ge 90 ]; then
    echo "Grade: A+"
elif [ $average -ge 80 ]; then
    echo "Grade: A"
elif [ $average -ge 70 ]; then
    echo "Grade: B"
elif [ $average -ge 60 ]; then
    echo "Grade: C"
elif [ $average -ge 50 ]; then
    echo "Grade: D"
else
    echo "Grade: F (Fail)"
fi

# Pass/Fail Status
if [ $s1 -lt 35 ] || [ $s2 -lt 35 ] || [ $s3 -lt 35 ] || [ $s4 -lt 35 ] || [ $s5 -lt 35 ]; then
    echo "Status: Fail (One or more subjects below 35)"
else
    echo "Status: Pass"
fi

----------------- problem 3 --------------------

#!/bin/bash

echo "Enter a number:"
read num

# 1. Palindrome Check
rev=0
temp=$num
while [ $temp -gt 0 ]; do
    digit=$((temp % 10))
    rev=$((rev * 10 + digit))
    temp=$((temp / 10))
done

if [ $rev -eq $num ]; then
    echo "$num is a Palindrome number"
else
    echo "$num is NOT a Palindrome number"
fi

# 2. Prime Number Check
is_prime=1
if [ $num -le 1 ]; then
    is_prime=0
else
    for ((i = 2; i <= num / 2; i++)); do
        if [ $((num % i)) -eq 0 ]; then
            is_prime=0
            break
        fi
    done
fi

if [ $is_prime -eq 1 ]; then
    echo "$num is a Prime number"
else
    echo "$num is NOT a Prime number"
fi

# 3. Fibonacci Series up to num terms
echo "Fibonacci series up to $num terms:"
a=0
b=1
for ((i = 0; i < num; i++)); do
    echo -n "$a "
    fn=$((a + b))
    a=$b
    b=$fn
done
echo

# 4. Armstrong Number Check (Only for 3-digit numbers)
sum=0
temp=$num
n=${#num}  # Number of digits
while [ $temp -gt 0 ]; do
    digit=$((temp % 10))
    sum=$((sum + digit ** n))
    temp=$((temp / 10))
done

if [ $sum -eq $num ]; then
    echo "$num is an Armstrong number"
else
    echo "$num is NOT an Armstrong number"
fi

```
