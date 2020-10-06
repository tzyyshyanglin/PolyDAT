var schema = {
  "title":"PolyDAT Online Form",
  "description":"Entry form for BigSMILES data objects. Each object holds the characterization of 1 polymer.",
  "type":"object",

  "options": {
    "disable_properties" : true
  },
  "format": "categories",
  "basicCategoryTitle": "Document and Polymer Info",
  "properties": {
    "preamble" : {
      "title" : "Preamble",
      "type" : "object",
      "format": "categories",
      "basicCategoryTitle": "Document and Polymer Info",
      "options": {
        "disable_properties" : false
      },
      "properties" : {
        "polymer" : {
          "title" : "Polymer BigSMILES",
          "description" : "BigSMILES for the polymer of interest",
          "type" : "string",
          "format" : "textarea",
          "options" : {
            "input_width" : "400px",
            "input_height" : "5em"
          }
        },
        "pdVersion" : {
          "title" : "Version of PolyDAT",
          "description" : "",
          "type" : "number",
          "default" : 1.0
        },
        "mixfileVersion" : {
          "title" : "Version of mixfile",
          "description" : "",
          "type" : "number",
          "default" : 0.01
        },
        "docID" : {
          "title" : "Document ID",
          "description" : "Unique ID for the document",
          "type" : "string"
        },
        "logs": {
          "title" : "Document Log",
          "description": "The edit log for the data document.",
          "type" : "array",
          "format": "tabs",
          "items": {
            "title": "Log Entry",
            "description": "The object that contains the edit log of BigSMILES documents.",
            "type" : "object",
            "properties":{
              "author":{
                "title" : "Author list",
                "description" : "the list of author indices (unique identifier strings such as ORCID) that contributed to the modification",
                "type" : "array",
                "format": "table",
                "items": {
                  "title" : "Author",
                  "type":"string"
                }
              },
              "date":{
                "title" : "Date of entry",
                "description" : "the date of the entry, in mm/dd/yyyy format",
                "type" : "string",
                "format" : "date"
              },
              "msg" :{
                "title" : "Log message",
                "description" : "the log message of the modifications made",
                "type" : "string",
                "format" : "textarea"
              }
            },
            "required":["author_id","date","msg"]
          }
        },
        "srcs" : {
          "title" : "Data Sources",
          "description" : "Sources to data found within the document",
          "type" : "array",
          "format" : "tabs",
          "items" : {
            "title" : "Source",
            "description" : "Reference to single literature source.",
            "type" : "object",
            "properties" : {
              "citeID" : {
                "title" : "Label for citing this reference",
                "type" : "string"
              },
              "doi" : {
                "type" : "string"
              },
              "desc" :{
                "title" : "Description",
                "description" : "additional description of the data source",
                "type" : "string",
                "format" : "textarea"
              }
            },
            "required" : ["citeID","doi"]
          }
        },
        "network" : {
          "title" : "Transformation Network",
          "description" : "syntax: [species1].[species2]....>[transformationA]>[speciesX].[speciesY]....",
          "type" : "array",
          "format" : "table",
          "items" : {
            "title" : "transformation",
            "type": "string"
          }
        }

      },
      "required" : ["polymer","pdVersion","mixfileVersion","docID","logs","srcs","network"]
    },
    "species" : {
      "title" : "Species",
      "type" : "array",
      "options" : {
        "array_controls_top" : true
      },
      "format" : "tabs",
      "items" : {
        "title" : "Species",
        "type" : "object",
        "headerTemplate": "{{i1}}: {{self.ID}}",
        "properties" : {
          "ID" : {
            "title" : "Species ID",
            "type" : "string",
            "watch" : {
              "species_list" : "root.speciesArray"
            },
            "enumSource" : [{
              "source" : "species_list",
              "value" : "{{item}}"
            }]
          },
          "contents" : {
            "$ref" : "#/definitions/content-obj"
          }
        },
        "required" : ["ID"]
      }
    },
    "transformation" : {
      "title" : "Transformation",
      "type" : "array",
      "format" : "tabs",
      "items" : {
        "title" : "Transformation" ,
        "type" : "object",
        "headerTemplate": "{{i1}}: {{self.ID}}",
        "properties" : {
          "ID" : {
            "title" : "Transformation ID",
            "type" : "string",
            "watch" : {
              "rxn_list" : "root.transArray"
            },
            "enumSource" :[{
              "source" : "rxn_list",
              "value" : "{{item}}"
            }]
          },
          "atomMap" : {
            "title" : "Atom Mapping",
            "type" : "array",
            "format" : "tabs",
            "items" : {
              "title" : "Atom Group",
              "description" : "syntax: [speciesID]atomID",
              "type" : "array",
              "format" : "table",
              "minItems" : 2,
              "items" : {
                "title" : "Corresponding atom",
                "type" : "string"
              }
            }
          }
        },
        "required" : ["ID","atomMap"]
      }
    },
    "speciesArray" :{
      "type" : "array",
      "format" : "table",
      "items" : {
        "title" : "species",
        "type" : "string"
      },
      "default" : ["[0]"],
      "options" :{
        "disable_array_add" : true,
        "disable_array_delete" : true
      }
    },
    "transArray" :{
      "type" : "array",
      "format" : "table",
      "items" : {
        "title" : "transformations",
        "type" : "string"
      },
      "options" :{
        "disable_array_add" : true,
        "disable_array_delete" : true
      }
    }
  },
  "required" : ["preamble","species","transformation","speciesArray","transArray"],

  "definitions" : {
    "content-obj" : {
      "title" : "Contents",
      "format" : "tabs",
      "type" : "array",
      "items" : {
        "title" : "Component",
        "$ref" : "#/definitions/component-obj"
      }
    },
    "component-obj" : {
      "type" : "object",
      "format" : "categories",
      "basicCategoryTitle": "Component Info",
      "properties" : {
        "ID" : {
          "title" : "ID",
          "description" : "ID for the (sub)component.",
          "type" : "string"
        },
        "bigsmiles" : {
          "title" : "BigSMILES",
          "description" : "(Labelled) (Big)SMILES string of the component.",
          "type" : "string",
          "format" : "textarea",
          "options" :{
            "input_width" : "400px",
            "input_height" : "5em"
          }
        },
        "contents" : {
          "$ref" : "#/definitions/content-obj"
        },

        "quantity" : {
          "type" : "number",
          "description" : "concentration or absolute quantity of component"
        },
        "units" : {
          "title" : "units",
          "description" : "any unit supported by the units ontology",
          "type" : "string",
          "enum" : ["UO_0000190","UO_0000013","UO_0000040","UO_0000022","UO_0000021","UO_0000009","UO_0000098","UO_0000099","UO_0000062","UO_0000063","UO_0000064"],
          "options" : {
            "enum_titles" : ["ratio","mole","mmol","mg","g","kg","mL","L","M","mM","uM"]
          }
        },

        "characterization" :{
          "title" : "Characterization",
          "type" : "object",
          "format" : "categories",
          "properties" : {
            "ratios" : {
              "title" : "Ratios",
              "description" : "relative ratios between substructures found within the target ensemble",
              "type" : "array",
              "format" : "tabs",
              "items" : {
                "$ref" : "#/definitions/ratio-obj"
              }
            },
            "Mn" : {
              "title" : "Mn",
              "description" : "number average molecular weight",
              "$ref" : "#/definitions/scalar-obj-mw"
            },
            "Mw" : {
              "title" : "Mw",
              "description" : "weight average molecular weight",
              "$ref" : "#/definitions/scalar-obj-mw"
            },
            "Mz" : {
              "title" : "Mz",
              "description" : "z average molecular weight",
              "$ref" : "#/definitions/scalar-obj-mw"
            },
            "DPn" : {
              "title" : "DPn",
              "description" : "number average degree of polymerization",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "DPw" : {
              "title" : "DPw",
              "description" : "weight average degree of polymerization",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "DPz" : {
              "title" : "DPz",
              "description" : "z average degree of polymerization",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "D" : {
              "title" : "D",
              "description" : "dispersity",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "skewness" : {
              "title" : "skewness",
              "description" : "skewness",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "kurtosis" : {
              "title" : "kurtosis",
              "description" : "kurtosis",
              "$ref" : "#/definitions/scalar-obj-1"
            },
            "MWD" : {
              "title" : "MWD",
              "description" : "molecular weight distribution",

              "$ref" : "#/definitions/vector-obj-mwd"
            }
          },
          "options" : {
            "display_required_only" : true,
            "remove_empty_properties" : true
          }
        },

        "name" : {
          "type" : "string"
        },
        "description" : {
          "type" :"string"
        },
        "synonyms" : {
          "type" : "string"
        },
        "relation" : {
          "type" : "array",
          "format" : "table",
          "minItems": 2,
          "maxItems": 2,
          "items" : {
            "title" : "items",
            "type" : "number"
          }
        },
        "ratio" : {
          "type" : "string"
        }

      },
      "options" :{
        "display_required_only" : true,
        "remove_empty_properties" : true
      },
      "required" : ["ID","bigsmiles","quantity","units","characterization"]
    },
    "ratio-obj" : {
      "title" : "Ratio",
      "type" : "object",
      "properties" : {
        "substructure" : {
          "title" : "Substructures",
          "type" : "array",
          "type" : "table",
          "options" :{
            "disable_array_delete_all_rows" : true
          },
          "items" : {
            "title" : "fragment SMARTS",
            "type" : "string"
          }
        },
        "ratio" : {
          "title" : "Relative abundance of each substructure",
          "type" : "array",
          "type" : "table",
          "options" :{
            "disable_array_add" : true,
            "disable_array_delete" : true,
            "disable_array_delete_all_rows" : true,
            "disable_array_delete_last_row" : true
          },
          "items" : {
            "title" : "quantity",
            "type" : "number"
          }
        },

        "unit" : {
          "type" : "string",
          "enum" : ["UO_0000013","UO_0000002"],
          "options" : {
            "enum_titles" : ["mole","mass"]
          }
        },
        "src" : {
          "type" : "string",
          "watch" : {
            "srcs" : "preamble.srcs"
          },
          "enumSource" : [{
            "source" : "srcs",
            "value" : "{{item.citeID}}"
          }]
        },
        "method" : {
          "type" : "string"
        },
        "uncertainty" : {
          "type" : "number"
        },
        "uncertainty_src" : {
          "type" : "string"
        }

      },
      "required" : ["substructure","ratio","unit"]
    },
    "scalar-obj-mw" : {
      "type" : "array",
      "format": "table",
      "items" : {
        "type" : "object",
        "title" : "Measurement",
        "properties" : {
          "value" : {
            "type" : "number"
          },
          "unit" : {
            "type" : "string",
            "enum" : ["UO_0000221","UO_0000222"],
            "options" : {
              "enum_titles" : ["Da","kDa"]
            }
          },
          "src" : {
            "type" : "string",
            "watch" : {
              "srcs" : "preamble.srcs"
            },
            "enumSource" : [{
              "source" : "srcs",
              "value" : "{{item.citeID}}"
            }]
          },
          "method" : {
            "type" : "string"
          },
          "uncertainty" : {
            "type" : "number"
          },
          "uncertainty_src" : {
            "type" : "string"
          }
        },
        "required" :["value","unit"],
        "options" :{
          "display_required_only" : false
        }
      }
    },
    "scalar-obj-1" : {
      "type" : "array",
      "format": "table",
      "items" : {
        "type" : "object",
        "title" : "Measurement",
        "properties" : {
          "value" : {
            "type" : "number"
          },
          "unit" : {
            "type" : "string",
            "enum" : ["UO_0000186"],
            "options" : {
              "enum_titles" : ["1"]
            }
          },
          "src" : {
            "type" : "string",
            "watch" : {
              "srcs" : "preamble.srcs"
            },
            "enumSource" : [{
              "source" : "srcs",
              "value" : "{{item.citeID}}"
            }]
          },
          "method" : {
            "type" : "string"
          },
          "uncertainty" : {
            "type" : "number"
          },
          "uncertainty_src" : {
            "type" : "string"
          }
        },
        "required" :["value","unit"],
        "options" :{
          "display_required_only" : false
        }
      }
    },
    "vector-obj-mwd" : {
      "type" : "array",
      "format": "table",
      "items" : {
        "title" : "Measurement",
        "type" : "object",
        "properties" : {
          "y-value" : {
            "title" : "intensities",
            "type" : "string",
            "options" : {
              "inputAttributes": {
                "placeholder":  "comma-delimited list of numbers"
              }
            }
          },
          "x-value" : {
            "title" : "mol. wt.",
            "type" : "string",
            "options" : {
              "inputAttributes": {
                "placeholder":  "comma-delimited list of numbers"
              }
            }
          },
          "x-unit" : {
            "title" : "mass units",
            "type" : "string",
            "enum" : ["UO_0000221","UO_0000222"],
            "options" : {
              "enum_titles" : ["Da","kDa"]
            }
          },
          "src" : {
            "type" : "string",
            "watch" : {
              "srcs" : "preamble.srcs"
            },
            "enumSource" : [{
              "source" : "srcs",
              "value" : "{{item.citeID}}"
            }]
          },
          "method" : {
            "type" : "string"
          },
          "uncertainty" : {
            "type" : "string"
          },
          "uncertainty_src" : {
            "type" : "string"
          }
        }
      },
      "required" :["x-value","y-value","x-unit"],
      "options" :{
        "display_required_only" : false
      }
    }
  }

}
