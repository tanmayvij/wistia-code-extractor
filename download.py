import json, os


for file in os.listdir("."):
    if(file.endswith(".json")):
       with open(file) as json_file:
        data = json.load(json_file)
        for vid in data['urls']:
            print(vid['name'])
            os.system('youtube-dl --output "' + data['dir'] + '/' + vid['name'] + '" ' + vid['url'])

