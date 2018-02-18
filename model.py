import os
from sqlalchemy import create_engine, Column, Integer, String, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# Create engine
dbpath = 'belly_button_biodiversity.sqlite'
engine = create_engine(f'sqlite:///{dbpath}', echo=True)
Base.metadata.create_all(engine)
session = Session(engine)
