import pandas as pd
import sqlite3

polls = pd.read_csv("backend/polls.csv")
print(polls.head(10))

# No data for Plaid Cymru so removing that table from the data
polls = polls.drop(columns="Plaid", axis=1)

# Creating a database which holds all of the polling percentages for each party
conn = sqlite3.connect("backend/polling_database.db")
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS polls(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pollster TEXT,
        sample INTEGER,
        date TEXT,
        party TEXT,
        percentage REAL           
    )
""")
conn.commit()
conn.close()