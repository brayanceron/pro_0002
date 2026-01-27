class GenerateParams :#{
    def __init__(self, genders : list[str] = [], senses : list[str] = [], singers : list[str] = [], languages : list[str] = []) :#{
        # self.genders : list[str] = genders or None
        # self.senses : list[str] = senses or None
        # self.singers : list[str] = singers or None
        # self.languages : list[str] = languages or None
        self.genders : list[str] = genders
        self.senses : list[str] = senses
        self.singers : list[str] = singers
        self.languages : list[str] = languages
    #}
    
    def get_dict(self) :#{
        return {
            "genders" : self.genders,
            "senses" : self.senses,
            "singers" : self.singers,
            "languages" : self.languages,
        }
    #}
    
#}  