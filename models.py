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
    question = db.Column(db.String(256))
    answer = db.Column(db.String(60))
    image = db.Column(db.String(512))
    hint_A = db.Column(db.String(256))
    hint_B = db.Column(db.String(256))
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
    leader_code = db.Column(db.String(128))
    member_code = db.Column(db.String(128))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    progress = db.Column(db.Integer)
    score = db.Column(db.Integer)
    has_paid = db.Column(db.Boolean, nullable=False, default=False)
    hunts_id = db.Column(db.Integer, db.ForeignKey('hunts.id'), nullable=False)
    
    def __init__(self, e, tn, i, lc, mc, st, et, p, s, hp, hid):
        self.email = e
        self.team_name = tn
        self.image = i
        self.leader_code = lc
        self.member_code = mc
        self.start_time = st
        self.end_time = et
        self.progress = p
        self.score = s
        self.has_paid = hp
        self.hunts_id = hid
    
    def __repr__(self): 
        return '<Question Data: %s %s %s %s %s %s %s %s %s %s %s>' % self.email % self.team_name % self.image % self.leader_code % self.member_code % self.start_time % self.end_time % self.progress % self.score % self.has_paid % self.hunts_id
        
class Admins(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    email = db.Column(db.String(512))
    username = db.Column(db.String(32))
    password = db.Column(db.String(128))
    is_super = db.Column(db.Boolean, nullable=False, default=False)
    
    def __init__(self, e, u, p, s):
        self.email = e
        self.username = u
        self.password = p
        self.is_super = s
    
    def __repr__(self): 
        return '<Question Data: %s %s %s %s>' % self.email % self.username % self.password % self.is_super
        
class Discounts(db.Model):
    id = db.Column(db.Integer, primary_key=True) # key
    code = db.Column(db.String(128))
    percent = db.Column(db.Integer)
    uses = db.Column(db.Integer)
    
    def __init__(self, c, p, u):
        self.code = c
        self.percent = p
        self.uses = u
    
    def __repr__(self): 
        return '<Discount Data: %s %s %s>' % self.code % self.percent % self.uses
