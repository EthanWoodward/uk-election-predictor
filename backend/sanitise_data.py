import pandas as pd
import sqlite3

polls = pd.read_csv("backend/polls.csv")
print(polls.head(10))

# No data for Plaid Cymru so removing that table from the data
polls = polls.drop(column="Plaid", axis=1)

# Creating a database which holds all of the polling percentages for each party