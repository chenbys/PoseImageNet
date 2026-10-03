/* Auto-generated gallery; statistics preserved from scripts/build_site_data.mjs. */
window.POSEIMAGENET_DATA = {
  "meta": {
    "version": "data-2026-09-21",
    "updated": "2026-09-21",
    "placeholder": true,
    "note": "Dataset statistics, superclass mapping, and gallery images are generated from the provided final annotations. The definition figure shows three representative structure prototypes in each of three superclass panels; the annotation figure remains a preview illustration.",
    "galleryVersion": "provided-2x3-512-v1"
  },
  "paper": {
    "title": "PoseImageNet: Pose Estimation for Extensive Classes Based on Rich Structure Prototypes",
    "shortTitle": "PoseImageNet",
    "venue": "ECCV 2026 (submitted)",
    "authors": [
      {
        "name": "Junjie Chen"
      },
      {
        "name": "Hong Cao"
      },
      {
        "name": "Weixiang Tao"
      },
      {
        "name": "Yuming Fang",
        "corresponding": true
      },
      {
        "name": "Jiebin Yan"
      },
      {
        "name": "Yifan Zuo"
      }
    ],
    "affiliation": "School of Computer Science and Artificial Intelligence, Jiangxi University of Finance and Economics, Nanchang, China",
    "links": [
      {
        "label": "Paper",
        "href": "#",
        "note": "coming soon"
      },
      {
        "label": "arXiv",
        "href": "#",
        "note": "coming soon"
      },
      {
        "label": "Code",
        "href": "#",
        "note": "coming soon"
      },
      {
        "label": "Data",
        "href": "#",
        "note": "coming soon"
      }
    ],
    "bibtex": "@inproceedings{chen2026poseimagenet,\n  title     = {PoseImageNet: Pose Estimation for Extensive Classes\n               Based on Rich Structure Prototypes},\n  author    = {Chen, Junjie and Cao, Hong and Tao, Weixiang and\n               Fang, Yuming and Yan, Jiebin and Zuo, Yifan},\n  booktitle = {European Conference on Computer Vision (ECCV)},\n  year      = {2026}\n}",
    "extraBibtex": `@inproceedings{chen2025weakshotkeypoint,
  title={Weak-shot Keypoint Estimation via Keyness and Correspondence Transfer},
  author={Chen, Junjie and Luo, Zeyu and Liu, Zezheng and Jiang, Wenhui and Li, Niu and Fang, Yuming},
  booktitle={The Thirty-ninth Annual Conference on Neural Information Processing Systems},
  year={2025}
}

@inproceedings{chen2025recurrent,
  title={Recurrent Feature Mining and Keypoint Mixup Padding for Category-Agnostic Pose Estimation},
  author={Chen, Junjie and Chen, Weilong and Zuo, Yifan and Fang, Yuming},
  booktitle={Proceedings of the Computer Vision and Pattern Recognition Conference},
  pages={22035--22044},
  year={2025}
}

@inproceedings{chen2024meta,
  title={Meta-Point Learning and Refining for Category-Agnostic Pose Estimation},
  author={Chen, Junjie and Yan, Jiebin and Fang, Yuming and Niu, Li},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={23534--23543},
  year={2024}
}`,
    "relatedRepos": [
      {
        "label": "MetaPoint (CVPR 2024)",
        "href": "https://github.com/chenbys/MetaPoint",
        "note": "Meta-Point Learning and Refining for Category-Agnostic Pose Estimation"
      },
      {
        "label": "FMMP (CVPR 2025)",
        "href": "https://github.com/chenbys/FMMP",
        "note": "Recurrent Feature Mining and Keypoint Mixup Padding for Category-Agnostic Pose Estimation"
      },
      {
        "label": "PoseProposal (CVPR 2026)",
        "href": "https://github.com/chenbys/PoseProposal",
        "note": "Learning to Propose Pose for Category-Agnostic Objects via Joint Refinement with Co-Matching Supervision"
      },
      {
        "label": "Completed-UniKPT-Multi-Class-Pose-Dataset",
        "href": "https://github.com/chenbys/Completed-UniKPT-Multi-Class-Pose-Dataset",
        "note": "Reorganized multi-class pose dataset with usable annotation files"
      },
      {
        "label": "Weak-shot Pose Estimation (NeurIPS 2025)",
        "href": "https://github.com/JUFE-EVL/WeakshotPoseEstimation",
        "note": "Weak-shot Keypoint Estimation via Keyness and Correspondence Transfer"
      }
    ],
    "funding": [
      "National Natural Science Foundation of China — U24A20220, 62132006, 62402201, 62271237, 62461028",
      "Natural Science Foundation of Jiangxi Province — 20252BAC230003, 20242BAB26014, 20252BAC240197",
      "China Postdoctoral Science Foundation — 2025M771495",
      "Early-Career Young Scientists and Technologists Project of Jiangxi Province — 20244BCE52070"
    ]
  },
  "headline": {
    "prototypes": 3616,
    "objectPoses": 71898,
    "semanticClasses": 717,
    "superclasses": 13,
    "keypoints": [
      2,
      68
    ]
  },
  "superclasses": [
    {
      "name": "Animal",
      "semanticClasses": 252,
      "prototypes": 852,
      "objectPoses": 23537
    },
    {
      "name": "Device",
      "semanticClasses": 121,
      "prototypes": 849,
      "objectPoses": 14098
    },
    {
      "name": "Vehicle",
      "semanticClasses": 11,
      "prototypes": 51,
      "objectPoses": 1090
    },
    {
      "name": "Equipment",
      "semanticClasses": 28,
      "prototypes": 149,
      "objectPoses": 2559
    },
    {
      "name": "Food",
      "semanticClasses": 38,
      "prototypes": 172,
      "objectPoses": 3316
    },
    {
      "name": "Structure",
      "semanticClasses": 35,
      "prototypes": 161,
      "objectPoses": 2861
    },
    {
      "name": "Furniture",
      "semanticClasses": 18,
      "prototypes": 103,
      "objectPoses": 2172
    },
    {
      "name": "Plant",
      "semanticClasses": 3,
      "prototypes": 18,
      "objectPoses": 303
    },
    {
      "name": "Tool",
      "semanticClasses": 128,
      "prototypes": 839,
      "objectPoses": 14314
    },
    {
      "name": "Plaything",
      "semanticClasses": 4,
      "prototypes": 21,
      "objectPoses": 376
    },
    {
      "name": "Toiletry",
      "semanticClasses": 7,
      "prototypes": 37,
      "objectPoses": 691
    },
    {
      "name": "Wear Items",
      "semanticClasses": 66,
      "prototypes": 337,
      "objectPoses": 6113
    },
    {
      "name": "Fungus",
      "semanticClasses": 6,
      "prototypes": 27,
      "objectPoses": 480
    }
  ],
  "charts": {
    "keypoints": {
      "bins": [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68"
      ],
      "counts": [
        3,
        2,
        113,
        54,
        192,
        166,
        339,
        205,
        259,
        196,
        244,
        203,
        161,
        165,
        136,
        234,
        135,
        110,
        70,
        79,
        79,
        63,
        60,
        52,
        37,
        28,
        33,
        29,
        14,
        28,
        18,
        18,
        15,
        12,
        6,
        7,
        3,
        10,
        8,
        6,
        0,
        5,
        3,
        1,
        0,
        2,
        0,
        2,
        0,
        0,
        1,
        1,
        2,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        2
      ],
      "total": 3616,
      "unit": "prototypes",
      "xLabel": "keypoints per prototype"
    },
    "prototypesPerClass": {
      "bins": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22"
      ],
      "counts": [
        140,
        41,
        39,
        101,
        101,
        89,
        65,
        54,
        35,
        14,
        15,
        8,
        5,
        2,
        5,
        0,
        0,
        0,
        1,
        0,
        0,
        2
      ],
      "total": 717,
      "unit": "semantic classes",
      "xLabel": "prototypes per semantic class"
    }
  },
  "gallery": [
    {
      "superclass": "Animal",
      "semanticClass": "meerkat",
      "prototypeCount": 13,
      "objectPoses": 247,
      "samples": [
        {
          "id": "n02138441_778",
          "prototype": "meerkat_10",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 39,
          "objectPoses": 16,
          "src": "assets/img/gallery/animal-meerkat-10-pose-1.png"
        },
        {
          "id": "n02138441_1188",
          "prototype": "meerkat_10",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 39,
          "objectPoses": 16,
          "src": "assets/img/gallery/animal-meerkat-10-pose-2.png"
        },
        {
          "id": "n02138441_5795",
          "prototype": "meerkat_10",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 39,
          "objectPoses": 16,
          "src": "assets/img/gallery/animal-meerkat-10-pose-3.png"
        },
        {
          "id": "n02138441_940",
          "prototype": "meerkat_17",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 34,
          "objectPoses": 14,
          "src": "assets/img/gallery/animal-meerkat-17-pose-1.png"
        },
        {
          "id": "n02138441_3928",
          "prototype": "meerkat_17",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 34,
          "objectPoses": 14,
          "src": "assets/img/gallery/animal-meerkat-17-pose-2.png"
        },
        {
          "id": "n02138441_5271",
          "prototype": "meerkat_17",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 34,
          "objectPoses": 14,
          "src": "assets/img/gallery/animal-meerkat-17-pose-3.png"
        }
      ],
      "availablePrototypeCount": 13,
      "availableObjectPoses": 247,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "meerkat_10",
          "keypoints": 39,
          "objectPoses": 16,
          "samples": [
            "n02138441_778",
            "n02138441_1188",
            "n02138441_5795"
          ]
        },
        {
          "index": 2,
          "prototype": "meerkat_17",
          "keypoints": 34,
          "objectPoses": 14,
          "samples": [
            "n02138441_940",
            "n02138441_3928",
            "n02138441_5271"
          ]
        }
      ]
    },
    {
      "superclass": "Device",
      "semanticClass": "laptop",
      "prototypeCount": 8,
      "objectPoses": 142,
      "samples": [
        {
          "id": "n03642806_18933",
          "prototype": "laptop_1",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 4,
          "objectPoses": 20,
          "src": "assets/img/gallery/device-laptop-prototype-1-pose-1.png"
        },
        {
          "id": "n03642806_16862",
          "prototype": "laptop_1",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 4,
          "objectPoses": 20,
          "src": "assets/img/gallery/device-laptop-prototype-1-pose-2.png"
        },
        {
          "id": "n03642806_15896",
          "prototype": "laptop_1",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 4,
          "objectPoses": 20,
          "src": "assets/img/gallery/device-laptop-prototype-1-pose-3.png"
        },
        {
          "id": "n03642806_17312",
          "prototype": "laptop_2",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 11,
          "objectPoses": 21,
          "src": "assets/img/gallery/device-laptop-prototype-2-pose-1.png"
        },
        {
          "id": "n03642806_19674",
          "prototype": "laptop_2",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 11,
          "objectPoses": 21,
          "src": "assets/img/gallery/device-laptop-prototype-2-pose-2.png"
        },
        {
          "id": "n03642806_1487",
          "prototype": "laptop_2",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 11,
          "objectPoses": 21,
          "src": "assets/img/gallery/device-laptop-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 8,
      "availableObjectPoses": 142,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "laptop_1",
          "keypoints": 4,
          "objectPoses": 20,
          "samples": [
            "n03642806_18933",
            "n03642806_16862",
            "n03642806_15896"
          ]
        },
        {
          "index": 2,
          "prototype": "laptop_2",
          "keypoints": 11,
          "objectPoses": 21,
          "samples": [
            "n03642806_17312",
            "n03642806_19674",
            "n03642806_1487"
          ]
        }
      ]
    },
    {
      "superclass": "Vehicle",
      "semanticClass": "oxcart",
      "prototypeCount": 9,
      "objectPoses": 145,
      "samples": [
        {
          "id": "n03868242_1585",
          "prototype": "oxcart_4",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 10,
          "objectPoses": 15,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-1-pose-1.png"
        },
        {
          "id": "n03868242_1492",
          "prototype": "oxcart_4",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 10,
          "objectPoses": 15,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-1-pose-2.png"
        },
        {
          "id": "n03868242_1013",
          "prototype": "oxcart_4",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 10,
          "objectPoses": 15,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-1-pose-3.png"
        },
        {
          "id": "n03868242_12086",
          "prototype": "oxcart_6",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 16,
          "objectPoses": 14,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-2-pose-1.png"
        },
        {
          "id": "n03868242_6627",
          "prototype": "oxcart_6",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 16,
          "objectPoses": 14,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-2-pose-2.png"
        },
        {
          "id": "n03868242_7425",
          "prototype": "oxcart_6",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 16,
          "objectPoses": 14,
          "src": "assets/img/gallery/vehicle-oxcart-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 9,
      "availableObjectPoses": 145,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "oxcart_4",
          "keypoints": 10,
          "objectPoses": 15,
          "samples": [
            "n03868242_1585",
            "n03868242_1492",
            "n03868242_1013"
          ]
        },
        {
          "index": 2,
          "prototype": "oxcart_6",
          "keypoints": 16,
          "objectPoses": 14,
          "samples": [
            "n03868242_12086",
            "n03868242_6627",
            "n03868242_7425"
          ]
        }
      ]
    },
    {
      "superclass": "Equipment",
      "semanticClass": "barbell",
      "prototypeCount": 6,
      "objectPoses": 100,
      "samples": [
        {
          "id": "n02790996_523",
          "prototype": "barbell_3",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 11,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-1-pose-1.png"
        },
        {
          "id": "n02790996_10351",
          "prototype": "barbell_3",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 11,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-1-pose-2.png"
        },
        {
          "id": "n02790996_10007",
          "prototype": "barbell_3",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 11,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-1-pose-3.png"
        },
        {
          "id": "n02790996_1042",
          "prototype": "barbell_7",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 14,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-2-pose-1.png"
        },
        {
          "id": "n02790996_4976",
          "prototype": "barbell_7",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 14,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-2-pose-2.png"
        },
        {
          "id": "n02790996_16325",
          "prototype": "barbell_7",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 14,
          "objectPoses": 20,
          "src": "assets/img/gallery/equipment-barbell-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 6,
      "availableObjectPoses": 100,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "barbell_3",
          "keypoints": 11,
          "objectPoses": 20,
          "samples": [
            "n02790996_523",
            "n02790996_10351",
            "n02790996_10007"
          ]
        },
        {
          "index": 2,
          "prototype": "barbell_7",
          "keypoints": 14,
          "objectPoses": 20,
          "samples": [
            "n02790996_1042",
            "n02790996_4976",
            "n02790996_16325"
          ]
        }
      ]
    },
    {
      "superclass": "Food",
      "semanticClass": "banana",
      "prototypeCount": 9,
      "objectPoses": 130,
      "samples": [
        {
          "id": "n07753592_12883",
          "prototype": "banana_1",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/food-banana-prototype-1-pose-1.png"
        },
        {
          "id": "n07753592_10262",
          "prototype": "banana_1",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/food-banana-prototype-1-pose-2.png"
        },
        {
          "id": "n07753592_10800",
          "prototype": "banana_1",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/food-banana-prototype-1-pose-3.png"
        },
        {
          "id": "n07753592_15986",
          "prototype": "banana_5",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 8,
          "objectPoses": 9,
          "src": "assets/img/gallery/food-banana-5-pose-1.png"
        },
        {
          "id": "n07753592_437",
          "prototype": "banana_5",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 8,
          "objectPoses": 9,
          "src": "assets/img/gallery/food-banana-5-pose-2.png"
        },
        {
          "id": "n07753592_7813",
          "prototype": "banana_5",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 8,
          "objectPoses": 9,
          "src": "assets/img/gallery/food-banana-5-pose-3.png"
        }
      ],
      "availablePrototypeCount": 9,
      "availableObjectPoses": 130,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "banana_1",
          "keypoints": 8,
          "objectPoses": 21,
          "samples": [
            "n07753592_12883",
            "n07753592_10262",
            "n07753592_10800"
          ]
        },
        {
          "index": 2,
          "prototype": "banana_5",
          "keypoints": 8,
          "objectPoses": 9,
          "samples": [
            "n07753592_15986",
            "n07753592_437",
            "n07753592_7813"
          ]
        }
      ]
    },
    {
      "superclass": "Structure",
      "semanticClass": "birdhouse",
      "prototypeCount": 10,
      "objectPoses": 201,
      "samples": [
        {
          "id": "n02843684_18202",
          "prototype": "birdhouse_2",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 13,
          "objectPoses": 15,
          "src": "assets/img/gallery/structure-birdhouse-prototype-1-pose-1.png"
        },
        {
          "id": "n02843684_14899",
          "prototype": "birdhouse_2",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 13,
          "objectPoses": 15,
          "src": "assets/img/gallery/structure-birdhouse-prototype-1-pose-2.png"
        },
        {
          "id": "n02843684_21861",
          "prototype": "birdhouse_2",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 13,
          "objectPoses": 15,
          "src": "assets/img/gallery/structure-birdhouse-prototype-1-pose-3.png"
        },
        {
          "id": "n02843684_761",
          "prototype": "birdhouse_15",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 19,
          "objectPoses": 16,
          "src": "assets/img/gallery/structure-birdhouse-prototype-2-pose-1.png"
        },
        {
          "id": "n02843684_4969",
          "prototype": "birdhouse_15",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 19,
          "objectPoses": 16,
          "src": "assets/img/gallery/structure-birdhouse-prototype-2-pose-2.png"
        },
        {
          "id": "n02843684_5481",
          "prototype": "birdhouse_15",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 19,
          "objectPoses": 16,
          "src": "assets/img/gallery/structure-birdhouse-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 10,
      "availableObjectPoses": 201,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "birdhouse_2",
          "keypoints": 13,
          "objectPoses": 15,
          "samples": [
            "n02843684_18202",
            "n02843684_14899",
            "n02843684_21861"
          ]
        },
        {
          "index": 2,
          "prototype": "birdhouse_15",
          "keypoints": 19,
          "objectPoses": 16,
          "samples": [
            "n02843684_761",
            "n02843684_4969",
            "n02843684_5481"
          ]
        }
      ]
    },
    {
      "superclass": "Furniture",
      "semanticClass": "bassinet",
      "prototypeCount": 11,
      "objectPoses": 201,
      "samples": [
        {
          "id": "n02804414_730",
          "prototype": "bassinet_4",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 25,
          "objectPoses": 21,
          "src": "assets/img/gallery/furniture-bassinet-4-pose-1.png"
        },
        {
          "id": "n02804414_1119",
          "prototype": "bassinet_4",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 25,
          "objectPoses": 21,
          "src": "assets/img/gallery/furniture-bassinet-4-pose-2.png"
        },
        {
          "id": "n02804414_1832",
          "prototype": "bassinet_4",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 25,
          "objectPoses": 21,
          "src": "assets/img/gallery/furniture-bassinet-4-pose-3.png"
        },
        {
          "id": "n02804414_3798",
          "prototype": "bassinet_14",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 14,
          "objectPoses": 5,
          "src": "assets/img/gallery/furniture-bassinet-14-pose-1.png"
        },
        {
          "id": "n02804414_2980",
          "prototype": "bassinet_14",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 14,
          "objectPoses": 5,
          "src": "assets/img/gallery/furniture-bassinet-14-pose-2.png"
        },
        {
          "id": "n02804414_5284",
          "prototype": "bassinet_14",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 14,
          "objectPoses": 5,
          "src": "assets/img/gallery/furniture-bassinet-14-pose-3.png"
        }
      ],
      "availablePrototypeCount": 11,
      "availableObjectPoses": 201,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "bassinet_4",
          "keypoints": 25,
          "objectPoses": 21,
          "samples": [
            "n02804414_730",
            "n02804414_1119",
            "n02804414_1832"
          ]
        },
        {
          "index": 2,
          "prototype": "bassinet_14",
          "keypoints": 14,
          "objectPoses": 5,
          "samples": [
            "n02804414_3798",
            "n02804414_2980",
            "n02804414_5284"
          ]
        }
      ]
    },
    {
      "superclass": "Plant",
      "semanticClass": "daisy",
      "prototypeCount": 11,
      "objectPoses": 157,
      "samples": [
        {
          "id": "n11939491_1012",
          "prototype": "daisy_8",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-8-pose-1.png"
        },
        {
          "id": "n11939491_2724",
          "prototype": "daisy_8",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-8-pose-2.png"
        },
        {
          "id": "n11939491_1183",
          "prototype": "daisy_8",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-8-pose-3.png"
        },
        {
          "id": "n11939491_42762",
          "prototype": "daisy_24",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-24-pose-1.png"
        },
        {
          "id": "n11939491_18743",
          "prototype": "daisy_24",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-24-pose-2.png"
        },
        {
          "id": "n11939491_19987",
          "prototype": "daisy_24",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 12,
          "objectPoses": 21,
          "src": "assets/img/gallery/plant-daisy-24-pose-3.png"
        }
      ],
      "availablePrototypeCount": 11,
      "availableObjectPoses": 157,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "daisy_8",
          "keypoints": 12,
          "objectPoses": 21,
          "samples": [
            "n11939491_1012",
            "n11939491_2724",
            "n11939491_1183"
          ]
        },
        {
          "index": 2,
          "prototype": "daisy_24",
          "keypoints": 12,
          "objectPoses": 21,
          "samples": [
            "n11939491_42762",
            "n11939491_18743",
            "n11939491_19987"
          ]
        }
      ]
    },
    {
      "superclass": "Tool",
      "semanticClass": "power drill",
      "prototypeCount": 6,
      "objectPoses": 103,
      "samples": [
        {
          "id": "n03995372_8332",
          "prototype": "power drill_2",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 23,
          "objectPoses": 18,
          "src": "assets/img/gallery/tool-power-drill-prototype-1-pose-1.png"
        },
        {
          "id": "n03995372_115",
          "prototype": "power drill_2",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 23,
          "objectPoses": 18,
          "src": "assets/img/gallery/tool-power-drill-prototype-1-pose-2.png"
        },
        {
          "id": "n03995372_2670",
          "prototype": "power drill_2",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 23,
          "objectPoses": 18,
          "src": "assets/img/gallery/tool-power-drill-prototype-1-pose-3.png"
        },
        {
          "id": "n03995372_1891",
          "prototype": "power drill_4",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 13,
          "objectPoses": 21,
          "src": "assets/img/gallery/tool-power-drill-prototype-2-pose-1.png"
        },
        {
          "id": "n03995372_1006",
          "prototype": "power drill_4",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 13,
          "objectPoses": 21,
          "src": "assets/img/gallery/tool-power-drill-prototype-2-pose-2.png"
        },
        {
          "id": "n03995372_1913",
          "prototype": "power drill_4",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 13,
          "objectPoses": 21,
          "src": "assets/img/gallery/tool-power-drill-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 6,
      "availableObjectPoses": 103,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "power drill_2",
          "keypoints": 23,
          "objectPoses": 18,
          "samples": [
            "n03995372_8332",
            "n03995372_115",
            "n03995372_2670"
          ]
        },
        {
          "index": 2,
          "prototype": "power drill_4",
          "keypoints": 13,
          "objectPoses": 21,
          "samples": [
            "n03995372_1891",
            "n03995372_1006",
            "n03995372_1913"
          ]
        }
      ]
    },
    {
      "superclass": "Plaything",
      "semanticClass": "teddy",
      "prototypeCount": 7,
      "objectPoses": 145,
      "samples": [
        {
          "id": "n04399382_10190",
          "prototype": "teddy_5",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 53,
          "objectPoses": 13,
          "src": "assets/img/gallery/plaything-teddy-prototype-1-pose-1.png"
        },
        {
          "id": "n04399382_1007",
          "prototype": "teddy_5",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 53,
          "objectPoses": 13,
          "src": "assets/img/gallery/plaything-teddy-prototype-1-pose-2.png"
        },
        {
          "id": "n04399382_4858",
          "prototype": "teddy_5",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 53,
          "objectPoses": 13,
          "src": "assets/img/gallery/plaything-teddy-prototype-1-pose-3.png"
        },
        {
          "id": "n04399382_2713",
          "prototype": "teddy_8",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 20,
          "objectPoses": 18,
          "src": "assets/img/gallery/plaything-teddy-prototype-2-pose-1.png"
        },
        {
          "id": "n04399382_1495",
          "prototype": "teddy_8",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 20,
          "objectPoses": 18,
          "src": "assets/img/gallery/plaything-teddy-prototype-2-pose-2.png"
        },
        {
          "id": "n04399382_2590",
          "prototype": "teddy_8",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 20,
          "objectPoses": 18,
          "src": "assets/img/gallery/plaything-teddy-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 7,
      "availableObjectPoses": 145,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "teddy_5",
          "keypoints": 53,
          "objectPoses": 13,
          "samples": [
            "n04399382_10190",
            "n04399382_1007",
            "n04399382_4858"
          ]
        },
        {
          "index": 2,
          "prototype": "teddy_8",
          "keypoints": 20,
          "objectPoses": 18,
          "samples": [
            "n04399382_2713",
            "n04399382_1495",
            "n04399382_2590"
          ]
        }
      ]
    },
    {
      "superclass": "Toiletry",
      "semanticClass": "sunscreen",
      "prototypeCount": 8,
      "objectPoses": 134,
      "samples": [
        {
          "id": "n04357314_15264",
          "prototype": "sunscreen_1",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 16,
          "objectPoses": 21,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-1-pose-1.png"
        },
        {
          "id": "n04357314_12716",
          "prototype": "sunscreen_1",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 16,
          "objectPoses": 21,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-1-pose-2.png"
        },
        {
          "id": "n04357314_139",
          "prototype": "sunscreen_1",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 16,
          "objectPoses": 21,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-1-pose-3.png"
        },
        {
          "id": "n04357314_1045",
          "prototype": "sunscreen_2",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 12,
          "objectPoses": 20,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-2-pose-1.png"
        },
        {
          "id": "n04357314_3904",
          "prototype": "sunscreen_2",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 12,
          "objectPoses": 20,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-2-pose-2.png"
        },
        {
          "id": "n04357314_14526",
          "prototype": "sunscreen_2",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 12,
          "objectPoses": 20,
          "src": "assets/img/gallery/toiletry-sunscreen-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 8,
      "availableObjectPoses": 134,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "sunscreen_1",
          "keypoints": 16,
          "objectPoses": 21,
          "samples": [
            "n04357314_15264",
            "n04357314_12716",
            "n04357314_139"
          ]
        },
        {
          "index": 2,
          "prototype": "sunscreen_2",
          "keypoints": 12,
          "objectPoses": 20,
          "samples": [
            "n04357314_1045",
            "n04357314_3904",
            "n04357314_14526"
          ]
        }
      ]
    },
    {
      "superclass": "Wear Items",
      "semanticClass": "running shoe",
      "prototypeCount": 6,
      "objectPoses": 124,
      "samples": [
        {
          "id": "n04120489_252",
          "prototype": "running shoe_1",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 28,
          "objectPoses": 21,
          "src": "assets/img/gallery/wear-items-running-shoe-prototype-1-pose-1.png"
        },
        {
          "id": "n04120489_12518",
          "prototype": "running shoe_1",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 28,
          "objectPoses": 21,
          "src": "assets/img/gallery/wear-items-running-shoe-prototype-1-pose-2.png"
        },
        {
          "id": "n04120489_10419",
          "prototype": "running shoe_1",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 28,
          "objectPoses": 21,
          "src": "assets/img/gallery/wear-items-running-shoe-prototype-1-pose-3.png"
        },
        {
          "id": "n04120489_4325",
          "prototype": "running shoe_6",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 24,
          "objectPoses": 18,
          "src": "assets/img/gallery/wear-items-running-shoe-6-pose-1.png"
        },
        {
          "id": "n04120489_4348",
          "prototype": "running shoe_6",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 24,
          "objectPoses": 18,
          "src": "assets/img/gallery/wear-items-running-shoe-6-pose-2.png"
        },
        {
          "id": "n04120489_4433",
          "prototype": "running shoe_6",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 24,
          "objectPoses": 18,
          "src": "assets/img/gallery/wear-items-running-shoe-6-pose-3.png"
        }
      ],
      "availablePrototypeCount": 6,
      "availableObjectPoses": 124,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "running shoe_1",
          "keypoints": 28,
          "objectPoses": 21,
          "samples": [
            "n04120489_252",
            "n04120489_12518",
            "n04120489_10419"
          ]
        },
        {
          "index": 2,
          "prototype": "running shoe_6",
          "keypoints": 24,
          "objectPoses": 18,
          "samples": [
            "n04120489_4325",
            "n04120489_4348",
            "n04120489_4433"
          ]
        }
      ]
    },
    {
      "superclass": "Fungus",
      "semanticClass": "agaric",
      "prototypeCount": 6,
      "objectPoses": 117,
      "samples": [
        {
          "id": "n12998815_12787",
          "prototype": "agaric_2",
          "prototypeIndex": 1,
          "poseIndex": 1,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-1-pose-1.png"
        },
        {
          "id": "n12998815_16782",
          "prototype": "agaric_2",
          "prototypeIndex": 1,
          "poseIndex": 2,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-1-pose-2.png"
        },
        {
          "id": "n12998815_1732",
          "prototype": "agaric_2",
          "prototypeIndex": 1,
          "poseIndex": 3,
          "keypoints": 8,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-1-pose-3.png"
        },
        {
          "id": "n12998815_1708",
          "prototype": "agaric_3",
          "prototypeIndex": 2,
          "poseIndex": 1,
          "keypoints": 9,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-2-pose-1.png"
        },
        {
          "id": "n12998815_14632",
          "prototype": "agaric_3",
          "prototypeIndex": 2,
          "poseIndex": 2,
          "keypoints": 9,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-2-pose-2.png"
        },
        {
          "id": "n12998815_14356",
          "prototype": "agaric_3",
          "prototypeIndex": 2,
          "poseIndex": 3,
          "keypoints": 9,
          "objectPoses": 21,
          "src": "assets/img/gallery/fungus-agaric-prototype-2-pose-3.png"
        }
      ],
      "availablePrototypeCount": 6,
      "availableObjectPoses": 117,
      "shownPrototypeCount": 2,
      "shownPoseCount": 6,
      "prototypeGroups": [
        {
          "index": 1,
          "prototype": "agaric_2",
          "keypoints": 8,
          "objectPoses": 21,
          "samples": [
            "n12998815_12787",
            "n12998815_16782",
            "n12998815_1732"
          ]
        },
        {
          "index": 2,
          "prototype": "agaric_3",
          "keypoints": 9,
          "objectPoses": 21,
          "samples": [
            "n12998815_1708",
            "n12998815_14632",
            "n12998815_14356"
          ]
        }
      ]
    }
  ]
};
