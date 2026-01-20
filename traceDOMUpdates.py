import json

with open("Trace-20251110T153433.json", encoding="utf-8") as f:
    trace = json.load(f)

count_add = 0
count_remove = 0
total_dur_add = 0
total_dur_remove = 0

for e in trace.get("traceEvents", []):
    stack = e.get("args", {}).get("data", {}).get("stackTrace", [])
    if not isinstance(stack, list):
        continue

    for frame in stack:
        fn = frame.get("functionName", "")
        if "addViewToDOM" in fn:
            count_add += 1
            total_dur_add += e.get("dur", 0) / 1000
            break
        elif "removeViewFromDOM" in fn:
            count_remove += 1
            total_dur_remove += e.get("dur", 0) / 1000
            break

total_count = count_add + count_remove
total_time = total_dur_add + total_dur_remove

print(f"addViewToDOM: {count_add} events, {total_dur_add:.2f} ms total")
print(f"removeViewFromDOM: {count_remove} events, {total_dur_remove:.2f} ms total")
print(f"TOTAL DOM updates: {total_count} events, {total_time:.2f} ms total")