"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [10, []],
            "answer": 100,
        },
        {
            "input": [4, [(2, 3), (0, 1)]],
            "answer": 11,
        },
        {
            "input": [8, [(1, 1), (3, 5), (7, 0), (7, 6)]],
            "answer": 29,
        },
    ],
    "Extra": [
        {
            "input": [2, [(1, 1)]],
            "answer": 2,
        },
        {
            "input": [6, [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]],
            "answer": 18,
        },
        {
            "input": [100, [(row, (row*row) % 100) for row in range(100)]],
            "answer": 6666,
        },
    ]
}
