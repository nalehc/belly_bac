from flask import Flask, render_template, jsonify, request, redirect
import pandas as pd
import pdb

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/names')
def names():
    data = pd.read_csv('./static/belly_button_biodiversity_samples.csv')
    columns = list(data.columns.values)
    names = columns[1:]
    return jsonify(names)

@app.route('/metadata/<sample>')
def metadata(sample):
    data = pd.read_csv('./static/Belly_Button_Biodiversity_Metadata.csv')
    data = data.fillna('missing')
    sample_meta = sample[3:]
    sample_meta = int(sample_meta)
    mdata_row = data.loc[data['SAMPLEID'] == sample_meta]
    mdata_list = mdata_row.values.tolist()[0]
    desc = pd.read_csv('./static/metadata_columns.csv')
    desc_list = desc["DESCRIPTION"].tolist()
    panel_text = dict(zip(desc_list, mdata_list))
    return jsonify (panel_text)

@app.route('/samples/<sample>')
def data(sample):
    data = pd.read_csv('./static/belly_button_biodiversity_samples.csv')
    sorted_data = data.sort_values(by=sample, ascending=False)
    rows = sorted_data.head(n=10)
    otu_ids = rows["otu_id"].tolist()
    sample_values = rows[sample].tolist()
    otu = pd.read_csv('./static/belly_button_biodiversity_otu_id.csv')
    otu_rows = otu.loc[otu['otu_id'].isin(otu_ids)]
    otu_names = otu_rows['lowest_taxonomic_unit_found'].tolist()
    data = {
        'values': sample_values,
        'labels': otu_names
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=False)