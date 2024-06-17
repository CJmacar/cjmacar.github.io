import requests
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def fetch_rune_data(rune_name, api_key):
    """
    Fetch the price history of the specified rune using the Unisat API.

    Args:
    rune_name (str): Name of the rune to fetch.
    api_key (str): API key for authenticating with the Unisat API.

    Returns:
    DataFrame: A pandas DataFrame containing the price history.
    """
    url = f"https://api.unisat.io/runes/{rune_name}/price-history"
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data)
        return df
    else:
        raise Exception(f"Failed to fetch data: {response.status_code} {response.text}")

def visualize_price_history(df, rune_name):
    """
    Visualize the price history of the rune using seaborn.

    Args:
    df (DataFrame): DataFrame containing the price data.
    rune_name (str): Name of the rune for title purposes.
    """
    sns.lineplot(x='timestamp', y='price', data=df)
    plt.title(f'Price History of {rune_name}')
    plt.xlabel('Date')
    plt.ylabel('Price (USD)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

def main(rune_name):
    api_key = 'da5132af7914ec70956d8d9644f1c6338f453e36ff83d5c1dd7f68a555d2adeb'
    df = fetch_rune_data(rune_name, api_key)
    visualize_price_history(df, rune_name)

if __name__ == '__main__':
    #rune_name = input("Enter the rune name: ")
    main('SATOSHI•NAKAMOTO')
