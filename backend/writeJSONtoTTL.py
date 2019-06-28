def writeJSONtoTTL(data, filename):
    f = open(filename,"a+")
    f.write("@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n")
    f.write("@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n")
    f.write("@prefix xsd: <https://www.w3.org/2001/XMLSchema#> .\n")
    f.write("@prefix owl: <http://www.w3.org/2002/07/owl#> .\n")
    f.write("@prefix ns0: <http://protege.stanford.edu/system#> .\n")
    f.write("@prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#> .\n")
    f.write("@prefix dc: <http://purl.org/dc/terms/> .\n")
    f.write("@prefix dbo: <http://dbpedia.org/resource/classes#> .\n")
    f.write("@prefix esco: <http://data.europa.eu/esco/model> .\n")
    f.write("@prefix my0: <http://example.com/rdf2resume_ontology.rdf#> .\n")
    f.write("@prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#> .\n\n\n")
    f.close()
