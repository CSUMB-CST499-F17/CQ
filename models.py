import flask_sqlalchemy, app, os, datetime

app.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

db = flask_sqlalchemy.SQLAlchemy(app.app)

class Hunts(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    name = db.Column(db.String(120))
    h_type = db.Column(db.String(60))
    desc = db.Column(db.Text)
    image = db.Column(db.String(512))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    start_text = db.Column(db.Text)
    
    def __init__(self, n, t, d, i, s, e, st):
        self.name = n
        self.h_type = t
        self.desc = d
        self.image = i
        self.start_time = s
        self.end_time = e
        self.start_desc = st
    
    def __repr__(self): 
        return '<Hunt Data: %s %s %s %s %s %s %s>' % self.name % self.type % self.desc % self.image % self.start_time % self.end_time % self.start_desc
        
class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    question = db.Column(db.String(120))
    answer = db.Column(db.String(60))
    image = db.Column(db.String(512))
    hint_A = db.Column(db.String(120))
    hint_B = db.Column(db.String(120))
    answer_text = db.Column(db.Text)
    hunts_id = db.Column(db.Integer, db.ForeignKey('hunts.id'), nullable=False)
    
    def __init__(self, q, a, i, ha, hb, at, hid):
        self.question = q
        self.answer = a
        self.image = i
        self.hint_A = ha
        self.hint_B = hb
        self.answer_text = at
        self.hunts_id = hid
    
    def __repr__(self): 
        return '<Question Data: %s %s %s %s %s %s %s>' % self.question % self.answer % self.image % self.hint_A % self.hint_B % self.answer_text % self.hunts_id
        
class Participants(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    email = db.Column(db.String(512))
    team_name = db.Column(db.String(32))
    image = db.Column(db.String(512))
    access_code = db.Column(db.String(40))
    question_score = db.Column(db.Integer)
    time_taken = db.Column(db.Time)
    hunts_id = db.Column(db.Integer, db.ForeignKey('hunts.id'), nullable=False)
    
    def __init__(self, e, tn, i, ac, qs, tt, hid):
        self.email = e
        self.team_name = tn
        self.image = i
        self.access_code = ac
        self.question_score = qs
        self.time_taken = tt
        self.hunts_id = hid
    
    def __repr__(self): 
        return '<Question Data: %s %s %s %s %s %s %s>' % self.email % self.team_name % self.image % self.access_code % self.question_score % self.time_taken % self.hunts_id
        
class Admins(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    email = db.Column(db.String(512))
    username = db.Column(db.String(32))
    password = db.Column(db.String(40))
    isSuper = db.Column(db.Boolean, nullable=False)
    
    def __init__(self, e, u, p, s):
        self.email = e
        self.username = u
        self.password = p
        self.isSuper = s
    
    def __repr__(self): 
        return '<Question Data: %s %s %s %s>' % self.email % self.username % self.password % self.isSuper