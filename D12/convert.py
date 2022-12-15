with open("input.txt") as infile:
    with open("input.heights", "w") as outfile:
        while line := infile.readline():
            out = ""
            for char in line:
                if char != "\n":
                    n = ord(char) - ord("a")
                    out += str(n) + " "
            outfile.write(out + "\n")
