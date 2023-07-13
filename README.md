# NostrKit README 

This Project is a Template Build. The end goal: to be able to make this repo a template and let people clone it for their own version. Right now, its not a template, but it should be easily convertible in the settings when finished.

Frameworks: Svelte and Node.js

The following are Guidelines: 


See original document at 
https://app.skiff.com/docs/76e41448-e865-44bf-b401-bfa0a3052299#e%2BeTJlKkwzy09IFE2DLFNPmCeWpzYAG9COhe5gTVJy4%3D

- Use Picocss v2 as the CSS and for forms - https://v2.picocss.com/docs

- This nostrkit website should be deployable on any domain-name.github.io, or vercel or netlify (custom domains)

- NIP-5, LNURL, and lightning address is as easy as creating a .well-known in the public directory and deploying it immediately. This means that

- End goal is to create a template so easy that someone who doesn't know how to code can just click on 'use template' and then it will create everything they need for a domain with NIP-5, lightning address, email forwarder.

- Allow ability for user to host the nostrkit website on a subdomain but have it update .well-known in another github repo which might be the actual domain website (e.g. plebnet website is the main domain, so the .well-known is on another github repo). [this is probably the trickiest]

- For example nostrkit website might be called https://services.domain.com but the actual website is at https://domain.com, so their NIP would be name@domain.com, which means that the .well-known must be hosted over at the repo that is used for domain.com 
  
- Allow ability for any one to visit the nostrkit website and create their own username@domain.com and then pay a small lightning invoice fee to get it added.

- Allow user to generate a nostr npub/nsec (free service)
- Allow user to pay for selected items only, e.g.
  - Allow user to generate a vanity npub/nsec (lightning fee)
  - Nostr NIP-5
  - lightning address only pointing at their lightning node, or 
  - lightning address with a LNBIts account created and/or 
  - lightning address with email forwarder to their personal email
  - purchase access to nostr relay (future, don't have it right now, but plan now to make it an option)
 
    
