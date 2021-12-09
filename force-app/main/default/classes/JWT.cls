//JWTBearerFlow.apxc
//EinsteinVisionOCRController.apxc
//EinsteinOCR.apxc
//HttpFormBuilder.apxc
//EinsteinOCRresponse.apxc
//ImageContentExtractor.apxc
//ContentDocumentLink.apxc
//Case1016
//contentDocumentID - 0697F00000m59JfQAI
//Case id - 5007F000003a2NLQAY
//links: SELECT ContentDocumentId,LinkedEntityId FROM ContentDocumentLink where LinkedEntityId='5007F000003a2NLQAY'
//versions: SELECT VersionData,Title,ContentDocumentId,FileExtension FROM ContentVersion WHERE ContentDocumentId = '0697F00000m59JfQAI' AND IsLatest = true
//ContentDistribution : select ContentDocumentId,DistributionPublicUrl,ContentDownloadURL from ContentDistribution where ContentDocumentId = '0697F00000m59JfQAI'
//Image x-y cordinat finder - https://yangcha.github.io/iview/iview.html
//https://www.pdffiller.com/jsfiller-desk18/?projectId=611396841#974137584bc153e62151eea76d41f957 - salaryslip images
public class JWT {
    
    public String alg {get;set;}
    public String iss {get;set;}
    public String sub {get;set;}
    public String aud {get;set;}
    public String exp {get;set;}
    public String iat {get;set;}
    public Map<String,String> claims {get;set;}
    public Integer validFor {get;set;}
    public String cert {get;set;}
    public String pkcs8 {get;set;}
    public String privateKey {get;set;}
    public static final String HS256 = 'HS256';
    public static final String RS256 = 'RS256';
    public static final String NONE = 'none';
    
    public JWT(String alg) {
        this.alg = alg;
        this.validFor = 300;
    }
    
    public String issue() {
    
        String jwt = '';    
        JSONGenerator header = JSON.createGenerator(false);
        header.writeStartObject();
        header.writeStringField('alg', this.alg);
        header.writeEndObject();
        String encodedHeader = base64URLencode(Blob.valueOf(header.getAsString()));
            
        JSONGenerator body = JSON.createGenerator(false);
        body.writeStartObject();
        body.writeStringField('iss', this.iss);
        body.writeStringField('sub', this.sub);
        body.writeStringField('aud', this.aud);
        Long rightNow = (dateTime.now().getTime()/1000)+1;
        body.writeNumberField('iat', rightNow);
        body.writeNumberField('exp', (rightNow + validFor));
        if (claims != null) {
            for (String claim : claims.keySet()) {
                body.writeStringField(claim, claims.get(claim));
            }
        }
        body.writeEndObject();
        
        jwt = encodedHeader + '.' + base64URLencode(Blob.valueOf(body.getAsString()));
        
        if ( this.alg == HS256 ) {
            Blob key = EncodingUtil.base64Decode(privateKey);
            Blob signature = Crypto.generateMac('hmacSHA256',Blob.valueof(jwt),key);
            jwt += '.' + base64URLencode(signature);  
        } else if ( this.alg == RS256 ) {
            Blob signature = null;
            
            if (cert != null ) {
                signature = Crypto.signWithCertificate('rsa-sha256', Blob.valueOf(jwt), cert);
            } else {
                Blob privateKey = EncodingUtil.base64Decode(pkcs8);
                signature = Crypto.sign('rsa-sha256', Blob.valueOf(jwt), privateKey);
            }
            jwt += '.' + base64URLencode(signature);  
        } else if ( this.alg == NONE ) {
            jwt += '.';
        }
        return jwt;
    }

    public String base64URLencode(Blob input){ 
        String output = encodingUtil.base64Encode(input);
        output = output.replace('+', '-');
        output = output.replace('/', '_');
        while ( output.endsWith('=')){
            output = output.subString(0,output.length()-1);
        }
        return output;
    }
}