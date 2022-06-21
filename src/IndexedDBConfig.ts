const DBConfig = {
    name: 'Pedigree',
    version: 1,
    objectStoresMeta: [
        {
            store: 'roosters',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'uuid', keypath: 'uuid', options: { unique: true } },
                { name: 'color', keypath: 'color', options: { unique: false } },
                { name: 'initials', keypath: 'initials', options: { unique: false } },
                { name: 'feather', keypath: 'feather', options: { unique: false } },
                { name: 'crest', keypath: 'crest', options: { unique: false } },
                { name: 'fecha', keypath: 'fecha', options: { unique: false } },
                { name: 'estado', keypath: 'estado', options: { unique: false } },
                { name: 'mother_id', keypath: 'mother_id', options: { unique: false } },
                { name: 'mother_color', keypath: 'mother_color', options: { unique: false } },
                { name: 'mother_initials', keypath: 'mother_initials', options: { unique: false } },
                { name: 'mother_mother_id', keypath: 'mother_mother_id', options: { unique: false } },
                { name: 'mother_mother_initials', keypath: 'mother_mother_initials', options: { unique: false } },
                { name: 'mother_father_id', keypath: 'mother_mother_id', options: { unique: false } },
                { name: 'mother_father_initials', keypath: 'mother_mother_initials', options: { unique: false } },
                { name: 'father_id', keypath: 'mother_id', options: { unique: false } },
                { name: 'father_color', keypath: 'mother_color', options: { unique: false } },
                { name: 'father_initials', keypath: 'mother_initials', options: { unique: false } },
                { name: 'father_mother_id', keypath: 'mother_mother_id', options: { unique: false } },
                { name: 'father_mother_initials', keypath: 'mother_mother_initials', options: { unique: false } },
                { name: 'father_father_id', keypath: 'mother_mother_id', options: { unique: false } },
                { name: 'father_father_initials', keypath: 'mother_mother_initials', options: { unique: false } },
                { name: 'notes', keypath: 'notes', options: { unique: false } },
            ]
        }
    ]
};

export default DBConfig;
