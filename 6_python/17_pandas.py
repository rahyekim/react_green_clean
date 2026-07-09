import pandas as pd

mydataset={
    'cars': ["BMW", "benz", "ford"],
    'passings': [3,7,2]
}


myvar = pd.DataFrame(mydataset)

print(myvar)


df = pd.read_json('dummy.json')
print(df.to_string())

