original = open('words.txt', "r")
new = open('improved.txt', "w")

for line in original:
  line = line.split(" ")[0].upper()
  new.write(line + "\n")
  print(line)

print("done")
original.close()
new.close()