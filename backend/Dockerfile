# ---------- Cynaris Internship Platform ----------
# Step 1: Use an official Node image
FROM node:18

# Step 2: Create app directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy project files
COPY . .

# Step 5: Expose backend port
EXPOSE 5000

# Step 6: Run the server
CMD ["npm", "run", "dev"]

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh
