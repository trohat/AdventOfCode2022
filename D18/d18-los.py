#Advent of Code 2022: Day 18
from datetime import datetime
from collections import deque
start = datetime.now()
def create_cubes(lines):
    cubes = set()
    for line in lines:
        cube = tuple(map(int,line.split(",")))
        cubes.add(cube)
    return cubes
 
def create_directions():
    directions = []
    all_directions = set([(x, y, z) for x in range(-1,2) for y in range(-1, 2) for z in range(-1,2)])
    for direction in all_directions:
        if manhDistance(direction, (0,0,0)) == 1:
            directions.append(direction)
    return directions
 
def tuple_sum(a,b):
    return tuple([x + y for x, y in zip(a,b)])
 
def manhDistance(a, b):
    return sum(abs(val1-val2) for val1, val2 in zip(a,b))
 
def check_neighbour(cube):
    open_sides = 6
    for direction in directions:
            neighbour = tuple_sum(direction, cube)
            if neighbour in cubes:
                open_sides -= 1
    return open_sides
 
def check_sides(cubes):
    counter = 0
    for cube in cubes:
        open_sides = check_neighbour(cube)
        counter += open_sides
    return counter
 
def count_surface(water_surface):
    counter = 0
    for cube in cubes:
        for direction in directions:
            if tuple_sum(direction, cube) in water_surface:
                counter += 1
    return counter
 
#MAIN
with open("data.txt") as file:
    lines = file.read().splitlines()
cubes = create_cubes(lines)
directions = create_directions()
 
#Cuve 3x3x3 with mid segment+one corner missing
#cubes = set((x,y,z) for x in range(2,5) for y in range(2,5) for z in range(2,5))
#cubes.remove((3,3,3))
#cubes.remove((2,2,2))
 
#Task1:
task1 = check_sides(cubes)
print("Task 1:", task1)
print("Runtime:", datetime.now()-start)
 
#Task2
max_size = 24
all_cubes = set((x,y,z) for x in range(-1, max_size+1) for y in range(-1, max_size+1) for z in range(-1,max_size+1))
start_cube = (1,1,1)
queue = deque([start_cube])
water_surface = set()
while queue:
    current_cube = queue[0]
    for direction in directions:
        neighbour = tuple_sum(direction, current_cube)
        if neighbour in all_cubes and neighbour not in cubes:
            #if check_neighbour(neighbour) <= 5:
            water_surface.add(neighbour)
            queue.append(neighbour)
            all_cubes.remove(neighbour)
    queue.popleft()
 
# size = 6
# for z in range(0,size):
#     print("Layer:",z)
#     for y in range(0,size):
#         for x in range(0,size):
#             if (x,y,z) in cubes:
#                 print("#", end="")
#             elif (x,y,z) in water_surface:
#                 print(".", end="")
#             else:
#                 print(" ", end="")
#         print(" ")
#     print(" ")
 
print(count_surface(water_surface))