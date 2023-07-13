# nostrkit

Guidelines: 

- Use Picocss v2 as the CSS and for forms - https://v2.picocss.com/docs
- This should be deployable on any domain-name.github.io, or vercel or netlify (custom domains)
-  NIP-5, LNURL, and lightning address is as easy as creating a .well-known in the public directory and deploying it immediately. This means that

- End goal is to create a template so easy that someone who doesn't know how to code can just click on 'use template' and then it will create everything they need for a domain with NIP-5, lightning address, email forwarder.
- Allow ability for user to host the nostrkit website on a subdomain but have it update .well-known in another github repo (e.g. plebnet website is the main domain, so the .well-known is on another github repo)
- Allow ability for any one to visit the nostrkit website and create their own username@domain.com and then pay a small lightning invoice fee to get it added.
- Allow user to pay for selected items only, e.g.
  - purchase NIP-5 only, 
  - ightning address only pointing at their lightning node, or
  - lightning address with a LNBIts account created and/or
  - lightning address with email forwarder to their personal email
  - purchase access to nostr relay
 
    
